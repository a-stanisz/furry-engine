const fs = require('fs');
const pdfkit = require('pdfkit');

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw (err);
    }
  });
}

const savePDF = (pdf, filename) => {
  return new Promise((resolve, reject) => {
    // To determine when the PDF has finished being written successfully 
    // we need to confirm the following 2 conditions:
    //
    //   1. The write stream has been closed
    //   2. PDFDocument.end() was called syncronously without an error being thrown

    let pendingStepCount = 2;

    const stepFinished = () => {
        if (--pendingStepCount == 0) {
            resolve();
        }
    };

    const writeStream = fs.createWriteStream(filename);
    writeStream.on('close', stepFinished);
    pdf.pipe(writeStream);

    pdf.end();

    stepFinished();
  })
}

exports.deleteFile = deleteFile;
exports.savePDF = savePDF;
