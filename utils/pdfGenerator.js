const PDFDocument = require('pdfkit');

exports.generateSalarySlip = (salary, user, res) => {
  const doc = new PDFDocument({ margin: 50 });

  doc.fontSize(20).text('EMS PRO - SALARY SLIP', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Employee: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Department: ${user.department}`);
  doc.text(`Period: ${salary.month}/${salary.year}`);
  doc.moveDown();
  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown();
  doc.text(`Base Salary: $${salary.baseAmount}`);
  doc.text(`Bonus: $${salary.bonus}`);
  doc.text(`Deductions: $${salary.deductions}`);
  doc.fontSize(14).text(`Net Payable: $${salary.netAmount}`, { bold: true });
  doc.moveDown();
  doc.fontSize(10).text('This is a computer-generated document. No signature required.', { italic: true });

  doc.pipe(res);
  doc.end();
};
