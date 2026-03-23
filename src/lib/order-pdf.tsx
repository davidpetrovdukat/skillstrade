import React from 'react';
import { Document, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';
import type { AIDocument } from '@/lib/ai-document-schema';

const styles = StyleSheet.create({
    page: {
        paddingTop: 40,
        paddingBottom: 48,
        paddingHorizontal: 42,
        backgroundColor: '#ffffff',
        color: '#111111',
        fontSize: 11,
        lineHeight: 1.55,
    },
    header: {
        marginBottom: 22,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#d9dfc2',
    },
    brand: {
        fontSize: 10,
        color: '#6b7280',
        letterSpacing: 1.2,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 12,
        color: '#4b5563',
    },
    metaRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 14,
        color: '#6b7280',
        fontSize: 10,
    },
    summaryBox: {
        marginBottom: 18,
        padding: 16,
        backgroundColor: '#f7f8f3',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    section: {
        marginBottom: 16,
    },
    sectionHeading: {
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 8,
        color: '#111827',
        textTransform: 'uppercase',
    },
    sectionBody: {
        marginBottom: 8,
        color: '#1f2937',
    },
    bullet: {
        marginBottom: 4,
        marginLeft: 10,
        color: '#374151',
    },
    listSection: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    listHeading: {
        fontSize: 12,
        fontWeight: 700,
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 42,
        right: 42,
        fontSize: 9,
        color: '#6b7280',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ececec',
        paddingTop: 8,
    },
});

function OrderPdfDocument(props: {
    document: AIDocument;
    orderId: string;
    serviceTitle: string;
}) {
    const { document, orderId, serviceTitle } = props;

    return (
        <Document
            title={document.documentTitle}
            author="Skills-Trade"
            subject={serviceTitle}
            producer="Skills-Trade"
            creator="Skills-Trade"
        >
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.brand}>Skills-Trade AI Document</Text>
                    <Text style={styles.title}>{document.documentTitle}</Text>
                    <Text style={styles.subtitle}>{document.documentSubtitle}</Text>
                    <View style={styles.metaRow}>
                        <Text>Order #{orderId.slice(-8).toUpperCase()}</Text>
                        <Text>{serviceTitle}</Text>
                    </View>
                </View>

                <View style={styles.summaryBox}>
                    <Text style={styles.sectionHeading}>Executive Summary</Text>
                    <Text>{document.executiveSummary}</Text>
                </View>

                {document.sections.map((section, index) => (
                    <View key={`${section.heading}-${index}`} style={styles.section}>
                        <Text style={styles.sectionHeading}>{section.heading}</Text>
                        <Text style={styles.sectionBody}>{section.body}</Text>
                        {section.bullets.map((bullet, bulletIndex) => (
                            <Text key={`${section.heading}-${bulletIndex}`} style={styles.bullet}>
                                - {bullet}
                            </Text>
                        ))}
                    </View>
                ))}

                <View style={styles.listSection}>
                    <Text style={styles.listHeading}>Deliverables</Text>
                    {document.deliverables.map((item, index) => (
                        <Text key={`deliverable-${index}`} style={styles.bullet}>
                            - {item}
                        </Text>
                    ))}
                </View>

                <View style={styles.listSection}>
                    <Text style={styles.listHeading}>Assumptions</Text>
                    {document.assumptions.length > 0 ? (
                        document.assumptions.map((item, index) => (
                            <Text key={`assumption-${index}`} style={styles.bullet}>
                                - {item}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.bullet}>- No major assumptions were required.</Text>
                    )}
                </View>

                <View style={styles.listSection}>
                    <Text style={styles.listHeading}>Next Steps</Text>
                    {document.nextSteps.map((item, index) => (
                        <Text key={`next-step-${index}`} style={styles.bullet}>
                            - {item}
                        </Text>
                    ))}
                </View>

                <View style={styles.footer} fixed>
                    <Text>Generated for Skills-Trade customer delivery</Text>
                    <Text
                        render={({ pageNumber, totalPages }) =>
                            `Page ${pageNumber} of ${totalPages}`
                        }
                    />
                </View>
            </Page>
        </Document>
    );
}

export async function renderOrderDocumentPdf(input: {
    document: AIDocument;
    orderId: string;
    serviceTitle: string;
}) {
    return renderToBuffer(<OrderPdfDocument {...input} />);
}
