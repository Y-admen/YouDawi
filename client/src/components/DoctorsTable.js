import React, { useMemo } from 'react';
import { useTable } from 'react-table';

// Example doctor data
const doctorData = [
  {
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    pic: 'https://via.placeholder.com/150',
    contact: '012 345 67',
    email: 'john.doe@example.com',
    available: 'Monday, Wednesday, Friday',
  },
  {
    name: 'Dr. Jane Smith',
    specialty: 'Pediatrics',
    contact: '+123 987 654',
    email: 'jane.smith@example.com',
    available: 'Tuesday, Thursday',
    pic: 'https://via.placeholder.com/150',
  },
  {
    name: 'Dr. Alice Lee',
    specialty: 'Dermatology',
    contact: '+123 456 789',
    email: 'alice.lee@example.com',
    available: 'Monday, Wednesday, Friday',
    pic: 'https://via.placeholder.com/150',

  },
  {
    name: 'Dr. Bob Johnson',
    specialty: 'Neurology',
    contact: '+123 123 456',
    email: 'bob.johnson@example.com',

    available: 'Tuesday, Thursday',
    pic: 'https://via.placeholder.com/150',

  },
  {
    name: 'Dr. Charlie Brown',
    specialty: 'Oncology',
    contact: '+123 789 012',
    email: 'charlie.brown@example.com',
    available: 'Monday, Wednesday, Friday',
    pic: 'https://via.placeholder.com/150',

  },
  {
    name: 'Dr. David Wilson',
    specialty: 'Ophthalmology',
    contact: '+123 456 789',
    email: 'david.wilson@example.com',
    available: 'Tuesday, Thursday',
    pic: 'https://via.placeholder.com/150',

  },
  {
    name: 'Dr. Emily Lee',
    specialty: 'Urology',
    contact: '+123 987 654',
    email: 'emily.lee@example.com',
    available: 'Monday, Wednesday, Friday',
    pic: 'https://via.placeholder.com/150',
  },
  // Add more doctor entries as needed
];

// Doctor Table Component
function DoctorsTable() {
  // Define table columns
  const columns = useMemo(
    () => [
      {
        Header: 'Doctor Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Specialty',
        accessor: 'specialty',
      },
      {
        Header: 'Contact Number',
        accessor: 'contact',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Availability',
        accessor: 'available',
      },
    ],
    []
  );

  // Define table data
  const data = useMemo(() => doctorData, []);

  // Use the `useTable` hook to build the table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="min-w-full bg-white border">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="text-left py-2 px-4 border-b font-semibold bg-gray-100"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="hover:bg-gray-50">
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="py-2 px-4 border-b">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DoctorsTable;
