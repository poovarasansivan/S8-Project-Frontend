import React, { useRef } from 'react';
import { HiDownload, HiUpload } from 'react-icons/hi';
import * as XLSX from 'xlsx';

export default function PSFileHandler({ onImport, data }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          // Map imported data to match AcademicData structure
          const transformedData = jsonData.map((item) => ({
            name: item.name || '',
            roll_no: item.roll_no || '',
            placement_fa: item.placement_fa || '',
            academic_fa: item.academic_fa || '',
            cgpa: parseFloat(item.cgpa) || 0,
            sem1: parseFloat(item.sem1) || 0,
            sem2: parseFloat(item.sem2) || 0,
            sem3: parseFloat(item.sem3) || 0,
            sem4: parseFloat(item.sem4) || 0,
            sem5: parseFloat(item.sem5) || 0,
            sem6: parseFloat(item.sem6) || 0,
            sem7: parseFloat(item.sem7) || 0,
            sem8: parseFloat(item.sem8) || 0,
            arrears: parseInt(item.arrears, 10) || 0,
          }));

          onImport(transformedData);
          event.target.value = ''; // Reset file input
        } catch (error) {
          console.error('Error parsing file:', error);
          alert('Error parsing file. Please ensure it\'s a valid Excel or CSV file.');
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleExport = () => {
    // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'AcademicData');

    // Generate the Excel file as an array buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Convert the array buffer to a Blob
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'AcademicData.xlsx';
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls,.csv"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-green-600/90 text-white font-bold py-2 px-4 rounded"
      >
        <HiUpload className="w-5 h-5" />
        Import
      </button>
      <button
        onClick={handleExport}
        className="flex items-center gap-2 bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded"
      >
        <HiDownload className="w-5 h-5" />
        Export
      </button>
    </div>
  );
}
