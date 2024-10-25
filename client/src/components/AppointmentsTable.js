import React from 'react';
import { useTable } from 'react-table';

// Table component
const AppointmentsTable = ({ appointmentsData }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Doctor Name',
        accessor: 'doctorName',
      },
      {
        Header: 'Patient Name',
        accessor: 'patientName',
      },
      {
        Header: 'Appointment Date',
        accessor: 'appointmentDate',
      },
      {
        Header: 'Appointment Time',
        accessor: 'appointmentTime',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  // التأكد من أن appointmentsData مصفوفة
  const data = React.useMemo(() => Array.isArray(appointmentsData) ? appointmentsData : [], [appointmentsData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className="p-4">
      <h2 className="text-3x1 font-semibold mb-4">Doctor Appointments</h2>
      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-200 rounded-lg shadow"
      >
        <thead className="bg-gray-100 text-left">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="py-2 px-4 text-sm font-medium text-gray-700"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="py-2 px-4 text-sm text-gray-600 border-b"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-2 px-4 text-sm text-center text-gray-500">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsTable;
