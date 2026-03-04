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

export default function Department(){

const [departments,setDepartments] = useState([])
const [loading,setLoading] = useState(true)

const navigate = useNavigate()

const fetchDepartments = async()=>{

const res = await api.get("/api/v1/departments")

setDepartments(res.data.data)

setLoading(false)

}

useEffect(()=>{
fetchDepartments()
},[])

const handleDelete = async(id)=>{

if(!window.confirm("Delete department?")) return

await api.delete(`/api/v1/departments/${id}`)

fetchDepartments()

}

return(

<div className="p-1 space-y-6">

<div className="flex items-center justify-between">

<h1 className="text-2xl font-semibold">
Department Management
</h1>

<Link to="/departments/new">
<Button className="bg-blue-900 text-white">
<Plus className="mr-2 h-4 w-4"/>
Add Department
</Button>
</Link>

</div>

<Table>

<TableHeader>

<TableRow>

<TableHead>Name</TableHead>
<TableHead>Code</TableHead>
<TableHead>Campus</TableHead>
<TableHead>Institution</TableHead>
<TableHead className="text-right">Actions</TableHead>

</TableRow>

</TableHeader>

<TableBody>

{loading ? (
<TableRow>
<TableCell colSpan={5} className="text-center">
Loading...
</TableCell>
</TableRow>
) : departments.map(dep=>(
<TableRow key={dep._id}>

<TableCell>{dep.name}</TableCell>

<TableCell>{dep.code}</TableCell>

<TableCell>{dep.campusId?.name}</TableCell>

<TableCell>
{dep.campusId?.institutionId?.name}
</TableCell>

<TableCell className="text-right flex justify-end">

<DropdownMenu>

<DropdownMenuTrigger asChild>

<Button variant="ghost" size="icon">
<MoreHorizontal/>
</Button>

</DropdownMenuTrigger>

<DropdownMenuContent align="end">

<DropdownMenuItem
onClick={()=>navigate(`/departments/${dep._id}`)}
>
View
</DropdownMenuItem>

<DropdownMenuItem
onClick={()=>navigate(`/departments/edit/${dep._id}`)}
>
Edit
</DropdownMenuItem>

<DropdownMenuItem
className="text-red-500"
onClick={()=>handleDelete(dep._id)}
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

)

}