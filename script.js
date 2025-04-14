// Dutch translations
const translations = {
    nl: {
        title: 'GradeWizard',
        maxPoints: 'Maximaal aantal punten:',
        nTerm: 'N-term (0,0 - 2,0):',
        showTwoDecimals: 'Toon 2 decimalen',
        showHalfPoints: 'Toon halve punten',
        calculateButton: 'Bereken Cijfers',
        passingGrades: 'Voldoendes (≥5,5)',
        failingGrades: 'Onvoldoendes (<5,5)',
        points: 'Punten',
        grade: 'Cijfer',
        copyright: '© 2025 GradeWizard - Alle rechten voorbehouden'
    }
};

// Format number with comma as decimal separator
function formatNumber(number, decimals) {
    return number.toFixed(decimals).replace('.', ',');
}

// Format text that contains numbers
function formatTextWithNumbers(text) {
    // Replace all decimal numbers with comma format
    return text.replace(/(\d+)\.(\d+)/g, '$1,$2');
}

function calculateGrades() {
    const maxPoints = parseInt(document.getElementById('maxPoints').value);
    const nTerm = parseFloat(document.getElementById('nTerm').value);
    const showTwoDecimals = document.getElementById('showTwoDecimals').checked;
    const showHalfPoints = document.getElementById('showHalfPoints').checked;
    const tableBodyLeft = document.getElementById('gradeTableBodyLeft');
    const tableBodyRight = document.getElementById('gradeTableBodyRight');
    
    // Clear existing table rows
    tableBodyLeft.innerHTML = '';
    tableBodyRight.innerHTML = '';
    
    // Validate input
    if (maxPoints < 1) {
        alert('Maximum aantal punten moet minimaal 1 zijn');
        return;
    }
    if (nTerm < 0 || nTerm > 2) {
        alert('N-term moet tussen 0 en 2 liggen');
        return;
    }
    
    // Determine the step size based on the showHalfPoints checkbox
    const stepSize = showHalfPoints ? 0.5 : 1;
    
    // Calculate grades for each possible point value, starting from highest
    for (let points = maxPoints; points >= 0; points -= stepSize) {
        const row = document.createElement('tr');
        
        // Calculate S/L ratio (points/maxPoints)
        const sOverL = points / maxPoints;
        
        // Calculate grade using the main formula: C = 9·S/L + N
        let grade = 9 * sOverL + nTerm;
        
        // Apply boundary conditions
        // C < 1 + 2·S·9/L
        const upperBound1 = 1 + 2 * sOverL * 9;
        // C > 1 + 0,5·S·9/L
        const lowerBound1 = 1 + 0.5 * sOverL * 9;
        // C > 10 - 2·(L-S)·9/L
        const lowerBound2 = 10 - 2 * (1 - sOverL) * 9;
        // C < 10 - 0,5·(L-S)·9/L
        const upperBound2 = 10 - 0.5 * (1 - sOverL) * 9;
        
        // Apply the most restrictive boundary
        grade = Math.min(grade, upperBound1, upperBound2);
        grade = Math.max(grade, lowerBound1, lowerBound2);
        
        // Round to specified decimal places
        // For 1 decimal: round to 1 decimal place
        // For 2 decimals: round down to 2 decimal places
        if (showTwoDecimals) {
            // Round down to 2 decimal places
            grade = Math.floor(grade * 100) / 100;
        } else {
            // Round to 1 decimal place
            grade = Math.round(grade * 10) / 10;
        }
        
        // Create table cells
        const pointsCell = document.createElement('td');
        pointsCell.textContent = formatNumber(points, showHalfPoints ? 1 : 0);
        
        const gradeCell = document.createElement('td');
        gradeCell.textContent = formatNumber(grade, showTwoDecimals ? 2 : 1);
        
        // Add color class based on grade
        if (grade >= 5.5) {
            gradeCell.classList.add('grade-pass');
        } else {
            gradeCell.classList.add('grade-fail');
        }
        
        row.appendChild(pointsCell);
        row.appendChild(gradeCell);
        
        // Add to the appropriate table based on the grade value
        if (grade >= 5.5) {
            tableBodyLeft.appendChild(row);
        } else {
            tableBodyRight.appendChild(row);
        }
    }
    
    // Update table titles to use the correct decimal separator
    document.querySelectorAll('.table-title').forEach(title => {
        title.textContent = formatTextWithNumbers(title.textContent);
    });
}

// Set up event listeners for automatic updates
function setupEventListeners() {
    // Event listener for the maxPoints input
    document.getElementById('maxPoints').addEventListener('input', calculateGrades);
    
    // Event listener for the nTerm input
    document.getElementById('nTerm').addEventListener('input', calculateGrades);
    
    // Event listener for the showTwoDecimals checkbox
    document.getElementById('showTwoDecimals').addEventListener('change', calculateGrades);
    
    // Event listener for the showHalfPoints checkbox
    document.getElementById('showHalfPoints').addEventListener('change', calculateGrades);
}

// Initialize the page
function initializePage() {
    // Set Dutch as the default language
    document.documentElement.lang = 'nl';
    
    // Set all text content to Dutch
    document.title = translations.nl.title;
    document.querySelector('h1').textContent = translations.nl.title;
    document.querySelector('label[for="maxPoints"]').textContent = translations.nl.maxPoints;
    document.querySelector('label[for="nTerm"]').textContent = translations.nl.nTerm;
    
    // Update checkbox labels
    document.querySelector('label[for="showTwoDecimals"]').textContent = translations.nl.showTwoDecimals;
    document.querySelector('label[for="showHalfPoints"]').textContent = translations.nl.showHalfPoints;
    
    document.querySelector('button').textContent = translations.nl.calculateButton;
    
    // Update table headers
    document.querySelectorAll('.table-title')[0].textContent = translations.nl.passingGrades;
    document.querySelectorAll('.table-title')[1].textContent = translations.nl.failingGrades;
    
    document.querySelectorAll('th').forEach((th, index) => {
        if (index % 2 === 0) {
            th.textContent = translations.nl.points;
        } else {
            th.textContent = translations.nl.grade;
        }
    });
    
    // Update copyright
    document.querySelector('.copyright').textContent = translations.nl.copyright;
    
    // Calculate grades
    calculateGrades();
}

// Calculate grades when the page loads and set up event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
});

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    
    // Get current values
    const maxPoints = document.getElementById('maxPoints').value;
    const nTerm = document.getElementById('nTerm').value;
    const showTwoDecimals = document.getElementById('showTwoDecimals').checked;
    const showHalfPoints = document.getElementById('showHalfPoints').checked;
    
    // Get table data
    const passingGrades = Array.from(document.getElementById('gradeTableBodyLeft').rows).map(row => ({
        points: row.cells[0].textContent,
        grade: row.cells[1].textContent
    }));
    
    const failingGrades = Array.from(document.getElementById('gradeTableBodyRight').rows).map(row => ({
        points: row.cells[0].textContent,
        grade: row.cells[1].textContent
    }));
    
    // Calculate how many rows we can fit on a page
    const pageHeight = 297; // A4 height in mm
    const pageWidth = 210; // A4 width in mm
    const margin = 10; // Margin in mm
    const rowHeight = 5; // Height of each row in mm
    const headerHeight = 5; // Height of header in mm
    const titleHeight = 30; // Height for title and parameters
    
    // Calculate available height for tables
    const availableHeight = pageHeight - titleHeight - (margin * 2);
    
    // Calculate how many rows can fit on a page
    const maxRowsPerPage = Math.floor(availableHeight / rowHeight);
    
    // Calculate how many pages we need
    const totalPassingRows = passingGrades.length;
    const totalFailingRows = failingGrades.length;
    const maxRowsPerTable = Math.max(totalPassingRows, totalFailingRows);
    const totalPages = Math.ceil(maxRowsPerTable / maxRowsPerPage);
    
    // Create PDF document
    const doc = new jsPDF();
    
    // Function to add header to each page
    function addHeader(pageNum) {
        // Add title only on first page
        if (pageNum === 1) {
            doc.setFontSize(14);
            doc.text('GradeWizard - Cijferoverzicht', margin, margin + 5);
            
            // Add parameters
            doc.setFontSize(9);
            doc.text(`Maximaal aantal punten: ${maxPoints}`, margin, margin + 12);
            doc.text(`N-term: ${nTerm}`, margin, margin + 17);
            doc.text(`Toon 2 decimalen: ${showTwoDecimals ? 'Ja' : 'Nee'}`, margin, margin + 22);
            doc.text(`Toon halve punten: ${showHalfPoints ? 'Ja' : 'Nee'}`, margin, margin + 27);
        }
        
        // Add page number
        doc.setFontSize(8);
        doc.text(`Pagina ${pageNum} van ${totalPages}`, pageWidth - margin - 20, margin + 5);
    }
    
    // Function to draw a table
    function drawTable(data, startRow, maxRows, x, y, title) {
        // Add table title
        doc.setFontSize(11);
        doc.text(title, x, y);
        
        // Table start position
        const tableStartY = y + 4;
        const colWidth = 30;
        
        // Draw table header
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.rect(x, tableStartY, colWidth * 2, headerHeight);
        
        // Add header text
        doc.setFontSize(8);
        doc.text('Punten', x + 5, tableStartY + 3);
        doc.text('Cijfer', x + colWidth + 5, tableStartY + 3);
        
        // Draw table rows
        let currentY = tableStartY + headerHeight;
        
        // Calculate which rows to show on this page
        const startIndex = startRow;
        const endIndex = Math.min(startIndex + maxRows, data.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const grade = data[i];
            
            // Draw row border
            doc.rect(x, currentY, colWidth * 2, rowHeight);
            
            // Draw column borders
            doc.line(x + colWidth, currentY, x + colWidth, currentY + rowHeight);
            
            // Add text
            doc.text(grade.points, x + 5, currentY + 3);
            doc.text(grade.grade, x + colWidth + 5, currentY + 3);
            
            currentY += rowHeight;
        }
        
        return currentY;
    }
    
    // Generate pages
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        // Add new page if not the first page
        if (pageNum > 1) {
            doc.addPage();
        }
        
        // Add header to the page
        addHeader(pageNum);
        
        // Calculate starting row for this page
        const startRow = (pageNum - 1) * maxRowsPerPage;
        
        // Draw passing grades table
        const passingTableY = titleHeight + margin;
        drawTable(
            passingGrades,
            startRow,
            maxRowsPerPage,
            margin,
            passingTableY,
            'Voldoendes (>=5,5)'
        );
        
        // Draw failing grades table
        const failingTableY = titleHeight + margin;
        drawTable(
            failingGrades,
            startRow,
            maxRowsPerPage,
            pageWidth / 2 + margin,
            failingTableY,
            'Onvoldoendes (<5,5)'
        );
    }
    
    // Save the PDF
    doc.save('gradewizard-cijferoverzicht.pdf');
}

function exportToExcel() {
    // Get current values
    const maxPoints = document.getElementById('maxPoints').value;
    const nTerm = document.getElementById('nTerm').value;
    const showTwoDecimals = document.getElementById('showTwoDecimals').checked;
    const showHalfPoints = document.getElementById('showHalfPoints').checked;
    
    // Get table data
    const passingGrades = Array.from(document.getElementById('gradeTableBodyLeft').rows).map(row => ({
        points: row.cells[0].textContent,
        grade: row.cells[1].textContent
    }));
    
    const failingGrades = Array.from(document.getElementById('gradeTableBodyRight').rows).map(row => ({
        points: row.cells[0].textContent,
        grade: row.cells[1].textContent
    }));
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    
    // Create header rows
    const headerRows = [
        ['GradeWizard - Cijferoverzicht'],
        [''],
        ['Parameters:'],
        ['Maximaal aantal punten', maxPoints],
        ['N-term', nTerm],
        ['Toon 2 decimalen', showTwoDecimals ? 'Ja' : 'Nee'],
        ['Toon halve punten', showHalfPoints ? 'Ja' : 'Nee'],
        [''],
        ['Voldoendes (>=5,5)', '', 'Onvoldoendes (<5,5)'],
        ['Punten', 'Cijfer', 'Punten', 'Cijfer']
    ];
    
    // Create data rows
    const maxRows = Math.max(passingGrades.length, failingGrades.length);
    const dataRows = [];
    
    for (let i = 0; i < maxRows; i++) {
        const row = [];
        
        // Add passing grade data if available
        if (i < passingGrades.length) {
            row.push(passingGrades[i].points);
            row.push(passingGrades[i].grade);
        } else {
            row.push('');
            row.push('');
        }
        
        // Add failing grade data if available
        if (i < failingGrades.length) {
            row.push(failingGrades[i].points);
            row.push(failingGrades[i].grade);
        } else {
            row.push('');
            row.push('');
        }
        
        dataRows.push(row);
    }
    
    // Combine header and data rows
    const allRows = [...headerRows, ...dataRows];
    
    // Create worksheet from all rows
    const ws = XLSX.utils.aoa_to_sheet(allRows);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Cijferoverzicht');
    
    // Save the Excel file
    XLSX.writeFile(wb, 'gradewizard-cijferoverzicht.xlsx');
} 