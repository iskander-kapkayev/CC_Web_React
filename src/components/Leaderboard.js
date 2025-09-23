/* this component will handle the Leaderboard display */

import React, { useState, useEffect} from 'react';
import { servURL } from './FetchURL.js';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

function Leaderboard() {
    const [error, setError] = useState(null); // set null error
    const [loading, setLoading] = useState(false); // set loading to null
    const [leaders, setLeaders] = useState([]); // set empty leaderboard
    /* const [retry, setRetry] = useState(0); */

    // try to grab the leaderboard
    // if there's a server grab error, try again
    
    useEffect(() => {
        const getLeaderboard = async () => {
            try {
                setLoading(true);
                const URL = `${servURL}/leaderboard`;
                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const leaderData = await response.json();
                const leaderDataArray = Object.values(leaderData).map(value => value); // array of the values

                setLeaders(leaderDataArray);
                setLoading(false);
                setError(null);
            } catch (err) {
                setError(err);
                console.log(err);
                /* setRetry(prev => prev + 1); */
            }
        };

        getLeaderboard();

    }, []);

    const columns = useMemo(() => [
        {
            accessorKey: 'username',
            header: 'Username',
        },
        {
            accessorKey: 'votecount',
            header: 'Aura',
        },
        {
            accessorKey: 'category',
            header: 'Power Level',
        },
    ], []);

    const table = useReactTable({
        data: leaders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (loading) {
        return (
            <div className="leaderboard">

                <h2>Leaderboard:</h2>
                <p>Leaderboard is currently loading...</p>

            </div>
        );
    } 
    
    return (
        <div className="leaderboard">

            <h2>Leaderboard:</h2>

                <table id="leaderdisplay">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    );
}

export default Leaderboard;