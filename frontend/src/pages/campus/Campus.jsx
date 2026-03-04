"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "@/lib/api"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal, Plus } from "lucide-react"

export default function Campus() {

  const [campuses, setCampuses] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const fetchCampuses = async () => {

    try {

      const res = await api.get("/api/v1/campuses")

      setCampuses(res.data.data)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {
    fetchCampuses()
  }, [])

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this campus?")) return

    await api.delete(`/api/v1/campuses/${id}`)

    fetchCampuses()

  }

  return (
    <div className="p-1 space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-semibold">
            Campus Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage campuses
          </p>
        </div>

        <Link to="/campuses/new">
          <Button className="bg-blue-900 text-white hover:bg-blue-800">
            <Plus className="mr-2 h-4 w-4"/>
            Add Campus
          </Button>
        </Link>

      </div>

      <div className="rounded-xl border bg-card">

        <Table>

          <TableHeader>

            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Campus</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>

          </TableHeader>

          <TableBody>

            {loading ? (

              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>

            ) : campuses.map((campus) => (

              <TableRow key={campus._id}>

                <TableCell>
                  {campus._id.slice(-6)}
                </TableCell>

                <TableCell className="font-medium">
                  {campus.name}
                </TableCell>

                <TableCell>
                  {campus.institutionId?.name}
                </TableCell>

                <TableCell>
                  {campus.location}
                </TableCell>

                <TableCell className="text-right flex justify-end">

                  <DropdownMenu>

                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4"/>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">

                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/campuses/${campus._id}`)
                        }
                      >
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/campuses/edit/${campus._id}`)
                        }
                      >
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => handleDelete(campus._id)}
                      >
                        Delete
                      </DropdownMenuItem>

                    </DropdownMenuContent>

                  </DropdownMenu>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>

    </div>
  )
}