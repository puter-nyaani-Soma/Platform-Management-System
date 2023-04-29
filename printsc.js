import html2canvas from 'html2canvas';
async function generatePDF() {
    await import('html2canvas');
    console.log("entered");
    const element = document.getElementById("makepdf");

    html2canvas(element).then(function (canvas) {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 211, 298);
      pdf.save("myticket.pdf");
      console.log("saved");
    });
  }