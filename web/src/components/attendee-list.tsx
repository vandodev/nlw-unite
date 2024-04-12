import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    MoreHorizontal,
    Search,
  } from 'lucide-react';
import { IconButton } from './icon-button';
import { Table } from './table/table';
import { TableHeader } from './table/table-header';
import { TableCell } from './table/table-cell';
import { TableRow } from './table/table-row';
// import { attendees } from "../data/attendees";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from 'react';

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

  export function AttendeeList() {
    const [page, setPage] = useState(1)
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / 10) 

    useEffect(() => {
      const url = new URL(
        "http://localhost:3333/events/dc8ccb07-ad81-467a-8859-df6c14446e8f/attendees"
      );  
      
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setAttendees(data.attendees);
          setTotal(data.total);
        });
    }, [page]);
  

    function goToFirstPage() {
      setPage(1);
    }

    function goToLastPage() {
      setPage(totalPages);
    }

    function goToNextPage() {
      setPage(page + 1);
    }

    function goToPreviousPage() {
      setPage(page - 1);
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Participantes</h1>
          <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
            <Search className="size-4 text-emerald-300" />
            <input
              className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
              placeholder="Buscar participante..."
            />
          </div>
        </div>

        <Table>
            <thead>
              <tr className="border-b border-white/10">
               <TableHeader>
                  <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                </TableHeader>
                <TableHeader >Código</TableHeader>
                <TableHeader >Participante</TableHeader>
                <TableHeader >
                  Data de inscrição
                </TableHeader>
                <TableHeader>
                  Data do check-in
                </TableHeader>
                <TableHeader
                  style={{ width: 64 }}
                ></TableHeader>
              </tr>
            </thead>
            <tbody>
            {/* {attendees.slice(page  * 10,(page + 1) * 10).map((ateendee) => { */}
            {attendees.map((ateendee) => {
                return (
                  <TableRow key={ateendee.id}>
                    <TableCell>
                      <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                    </TableCell>
                    <TableCell>{ateendee.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-white">
                          {ateendee.name}
                        </span>
                        <span>{ateendee.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{dayjs().to(ateendee.createdAt)}</TableCell>
                    
                    <TableCell>
                      {ateendee.checkedInAt === null ? (
                        <span className="text-zinc-400">Não fez check-in</span>
                      ) : (
                        dayjs().to(ateendee.checkedInAt)
                      )}
                    </TableCell>
                    
                    <TableCell>
                     <IconButton transparent={true}> 
                        <MoreHorizontal className="size-4" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <TableCell colSpan={3}>
                  Mostrando 10 de {total} itens
                </TableCell>
                <TableCell colSpan={3}>
                  <div className="inline-flex items-center gap-8">
                    <span>Página {page} de {totalPages} </span>
  
                    <div className="flex gap-1.5">
                      <IconButton 
                        onClick={goToFirstPage}
                        disabled={page === 1}
                      >
                        <ChevronsLeft className="size-4" />
                      </IconButton>

                      <IconButton 
                        onClick={goToPreviousPage} 
                        disabled={page === 1}
                      >
                        <ChevronLeft className="size-4" />
                      </IconButton>

                      <IconButton
                        onClick={goToNextPage}
                        disabled={page === totalPages}
                      >
                        <ChevronRight className="size-4" />
                      </IconButton>

                      <IconButton
                        onClick={goToLastPage}
                        disabled={page === totalPages}
                      >
                        <ChevronsRight className="size-4" />
                      </IconButton>
                    </div>
                  </div>
                </TableCell>
              </tr>
            </tfoot>
        </Table>

      </div>
    );
  }