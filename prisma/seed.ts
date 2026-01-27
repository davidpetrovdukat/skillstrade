import { PrismaClient, Role, OrderStatus, TxType } from '@prisma/client'
import { RAW_SERVICES_DATA, SERVICE_IMAGE_MAP } from '../src/lib/services-data'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // Clean DB
    try {
        await prisma.transaction.deleteMany()
        await prisma.order.deleteMany()
        await prisma.review.deleteMany()
        await prisma.serviceAddon.deleteMany()
        await prisma.service.deleteMany()
        await prisma.freelancer.deleteMany()
        await prisma.user.deleteMany()
        console.log('Deleted existing data.')
    } catch (e) {
        console.warn('Cleanup warning (might be empty DB):', e)
    }

    // Create Client User (Alice)
    const clientUser = await prisma.user.create({
        data: {
            email: 'client@skillstrade.com',
            firstName: 'Alice',
            lastName: 'Client',
            role: Role.CLIENT,
            walletBalance: 50000, // 500 EUR
            transactions: {
                create: {
                    amount: 50000,
                    type: TxType.DEPOSIT,
                    description: 'Initial Deposit'
                }
            }
        }
    })
    console.log('Created Client User: Alice')

    // Iterate Freelancers
    for (const item of RAW_SERVICES_DATA) {
        const { id: _ignoreId, meta, service: serviceData } = item
        const email = `${meta.name.split(' ')[0].toLowerCase()}@skillstrade.com`
        const slug = meta.name.toLowerCase().replace(/\s+/g, '-')

        console.log(`Processing ${meta.name}...`)

        // Create User for Freelancer
        const fUser = await prisma.user.create({
            data: {
                email,
                firstName: meta.name.split(' ')[0],
                lastName: meta.name.split(' ').slice(1).join(' '),
                role: Role.FREELANCER,
            }
        })

        // Create Freelancer Profile linked to User
        const freelancer = await prisma.freelancer.create({
            data: {
                userId: fUser.id,
                slug,
                name: meta.name,
                avatarUrl: meta.avatar_url,
                location: meta.location,
                flag: meta.flag,
                role: meta.role,
                bio: "Experienced professional delivering high-quality services for global clients.",
                verified: meta.verified,
                rating: 5.0, // Default starting rating
                reviewsCount: 0
            }
        })

        // Resolve Image
        // Try to find image in map by exact title match or partial
        let imageUrl = SERVICE_IMAGE_MAP[serviceData.title] || '/window.svg'

        // Create Service
        const service = await prisma.service.create({
            data: {
                title: serviceData.title,
                priceTokens: serviceData.price_tokens,
                displayPrice: serviceData.display_price_eur,
                // Defaults since these are not in RAW_SERVICES_DATA currently
                deliveryDays: 5,
                category: "Creative",
                tags: ["Professional", "Verified"],
                overview: serviceData.overview,
                deliverables: ["Source Files", "Revisions"],
                imageUrl,
                freelancerId: freelancer.id,
                addons: {
                    create: serviceData.addons.map(addon => ({
                        title: addon.title,
                        description: addon.desc,
                        priceTokens: addon.price_tokens,
                        isStandalone: addon.is_standalone
                    }))
                }
            }
        })

        // Create Dummy Order for Arthur
        if (meta.name.includes('Arthur')) {
            await prisma.order.create({
                data: {
                    clientId: clientUser.id,
                    freelancerId: freelancer.id,
                    serviceId: service.id,
                    totalTokens: serviceData.price_tokens,
                    status: OrderStatus.COMPLETED,
                    brief: "I need a minimalist logo for my startup 'TechFlow'.",
                    createdAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
                    deliveryDate: new Date(Date.now() - 86400000 * 1)
                }
            })

            // Add Transaction
            await prisma.transaction.create({
                data: {
                    userId: clientUser.id,
                    amount: -serviceData.price_tokens,
                    type: TxType.SPEND,
                    description: `Order #${slug.substring(0, 5)}...`
                }
            })
        }
    }

    console.log('✅ Seeding completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
