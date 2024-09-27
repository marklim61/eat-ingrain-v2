import {useTable} from "react-table";
import EditIcon from "../assets/edit.png"

const Table = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    return (
        <table {...getTableProps()} className="mx-auto w-full mb-5">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        <th className="p-[10px]" />
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                key={column.id}
                                className="border-2 border-[#83AF9B] bg-[#ECE5CE] p-[10px]"
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                        <th className="p-[10px]" />
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={row.id} style={{cursor: "pointer"}}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            {row.cells.map(cell => (
                                <td
                                    {...cell.getCellProps()}
                                    key={cell.column.id}
                                    className="overflow-hidden text-ellipsis max-w-[200px] p-[10px]"
                                    style={{ border: "1px dashed gray" }}
                                >
                                    {/* {cell.render("Cell")} */}
                                    {cell.value.length > 5 ? `${cell.value.substring(0, 20)}...` : cell.value}
                                </td>
                            ))}
                            <td>
                                <img src={EditIcon} alt="Edit" style={{cursor: "pointer"}} />
                            </td>                            
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Table;

