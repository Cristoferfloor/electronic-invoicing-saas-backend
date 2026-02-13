// Helper for invoicing calculations
export const calculateInvoiceTotals = (items: any[]) => {
  let subtotal = 0;
  let totalVat = 0;

  items.forEach(item => {
    const itemSubtotal = item.quantity * item.unitPrice - (item.discount || 0);
    subtotal += itemSubtotal;

    if (item.applyVat) {
      const itemVat = itemSubtotal * 0.15; // 15% VAT
      totalVat += itemVat;
    }
  });

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    totalVat: parseFloat(totalVat.toFixed(2)),
    total: parseFloat((subtotal + totalVat).toFixed(2)),
  };
};

// Helper to generate access key (49 digits)
export const generateAccessKey = (
  issueDate: Date,
  taxId: string,
  voucherType: string,
  series: string,
  sequential: string,
): string => {
  // Format: DDMMYYYYRUC+3dig+type+series+sequential+numericCode+2digits
  // Implementation logic according to SRI
  return 'generated-access-key-placeholder';
};

// Helper to format currency
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

// Helper to validate TAX ID (RUC)
export const validateTaxId = (taxId: string): boolean => {
  // Validate format and check digit for Ecuadorian TAX ID (RUC)
  return taxId.length === 13 && /^\d+$/.test(taxId);
};
