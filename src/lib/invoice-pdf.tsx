import React from 'react';
import { Document, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';

export interface InvoicePdfInput {
    invoiceNumber: string;
    invoiceDate: Date;
    transactionReference: string;
    paymentMethodLabel: string;
    customerName: string;
    customerEmail: string;
    billingAddress: string[];
    description: string;
    tokens: number;
    subtotal: number;
    vatAmount: number;
    total: number;
    currency: string;
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 40,
        paddingBottom: 42,
        paddingHorizontal: 42,
        backgroundColor: '#ffffff',
        color: '#111111',
        fontSize: 10.5,
        lineHeight: 1.5,
    },
    header: {
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#d9dfc2',
    },
    brand: {
        fontSize: 10,
        color: '#6b7280',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        marginBottom: 6,
    },
    subtitle: {
        color: '#4b5563',
        fontSize: 11,
    },
    twoColumn: {
        flexDirection: 'row',
        gap: 24,
        marginBottom: 24,
    },
    card: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#f7f8f3',
        padding: 14,
        minHeight: 122,
    },
    cardTitle: {
        fontSize: 10,
        color: '#6b7280',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    cardText: {
        marginBottom: 4,
    },
    table: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 18,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontWeight: 700,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    colDescription: {
        flex: 1.8,
        paddingRight: 10,
    },
    colTokens: {
        flex: 0.7,
        textAlign: 'right',
    },
    colAmount: {
        flex: 0.9,
        textAlign: 'right',
    },
    totals: {
        marginLeft: 'auto',
        width: 210,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 12,
    },
    totalsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    totalsGrand: {
        paddingTop: 8,
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#d1d5db',
        fontWeight: 700,
    },
    footer: {
        position: 'absolute',
        bottom: 18,
        left: 42,
        right: 42,
        borderTopWidth: 1,
        borderTopColor: '#ececec',
        paddingTop: 8,
        color: '#6b7280',
        fontSize: 9,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

function formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

function InvoicePdfDocument({ invoice }: { invoice: InvoicePdfInput }) {
    return (
        <Document
            title={`Invoice ${invoice.invoiceNumber}`}
            author="Skills-Trade"
            subject="Token purchase invoice"
            producer="Skills-Trade"
            creator="Skills-Trade"
        >
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.brand}>Skills-Trade Invoice</Text>
                    <Text style={styles.title}>Token Purchase Invoice</Text>
                    <Text style={styles.subtitle}>
                        This invoice confirms a successful token credit on Skills-Trade.
                    </Text>
                </View>

                <View style={styles.twoColumn}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Billed To</Text>
                        <Text style={styles.cardText}>{invoice.customerName}</Text>
                        <Text style={styles.cardText}>{invoice.customerEmail}</Text>
                        {invoice.billingAddress.map((line, index) => (
                            <Text key={`billing-${index}`} style={styles.cardText}>
                                {line}
                            </Text>
                        ))}
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Invoice Details</Text>
                        <Text style={styles.cardText}>Invoice No: {invoice.invoiceNumber}</Text>
                        <Text style={styles.cardText}>Invoice Date: {formatDate(invoice.invoiceDate)}</Text>
                        <Text style={styles.cardText}>Reference: {invoice.transactionReference}</Text>
                        <Text style={styles.cardText}>Payment Method: {invoice.paymentMethodLabel}</Text>
                        <Text style={styles.cardText}>Seller: Skills-Trade</Text>
                        <Text style={styles.cardText}>Support: info@skills-trade.com</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colDescription}>Description</Text>
                        <Text style={styles.colTokens}>Tokens</Text>
                        <Text style={styles.colAmount}>Amount</Text>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.colDescription}>{invoice.description}</Text>
                        <Text style={styles.colTokens}>{invoice.tokens.toLocaleString('en-GB')}</Text>
                        <Text style={styles.colAmount}>{formatCurrency(invoice.subtotal, invoice.currency)}</Text>
                    </View>
                </View>

                <View style={styles.totals}>
                    <View style={styles.totalsRow}>
                        <Text>Subtotal</Text>
                        <Text>{formatCurrency(invoice.subtotal, invoice.currency)}</Text>
                    </View>
                    <View style={styles.totalsRow}>
                        <Text>VAT</Text>
                        <Text>{formatCurrency(invoice.vatAmount, invoice.currency)}</Text>
                    </View>
                    <View style={[styles.totalsRow, styles.totalsGrand]}>
                        <Text>Total</Text>
                        <Text>{formatCurrency(invoice.total, invoice.currency)}</Text>
                    </View>
                </View>

                <View style={styles.footer} fixed>
                    <Text>Generated automatically by Skills-Trade</Text>
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

export async function renderInvoicePdf(input: InvoicePdfInput) {
    return renderToBuffer(<InvoicePdfDocument invoice={input} />);
}
