"use client"

import api from "@/lib/api"
import { useEffect,useState } from "react"
import { useNavigate,useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"

import {
Field,
FieldGroup,
FieldLabel,
FieldLegend,
FieldSet,
} from "@/components/ui/field"

import { ArrowLeft,Pencil } from "lucide-react"

export default function ViewDepartment(){

const navigate = useNavigate()
const { id } = useParams()

const [department,setDepartment] = useState(null)
const [loading,setLoading] = useState(true)

useEffect(()=>{

const fetchDepartment = async()=>{

try{

const res = await api.get(`/api/v1/departments/${id}`)

setDepartment(res.data)

}catch(error){

alert("Failed to load department")

}finally{

setLoading(false)

}

}

fetchDepartment()

},[id])

if(loading){
return <div className="p-6">Loading department...</div>
}

return(

<div className="p-2">

<div className="max-w-4xl">

<div className="mb-8 flex items-center justify-between">

<div>

<button
type="button"
onClick={()=>navigate(-1)}
className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-4"
>
<ArrowLeft className="h-4 w-4"/>
Back to Departments
</button>

<h2 className="text-2xl font-semibold">
{department.name}
</h2>

<p className="text-muted-foreground text-sm">
Department details overview
</p>

</div>

<Button
onClick={()=>navigate(`/departments/edit/${id}`)}
className="bg-blue-900 text-white hover:bg-blue-800"
>
<Pencil className="h-4 w-4"/>
Edit
</Button>

</div>

<FieldSet>

<FieldLegend>Department Information</FieldLegend>

<FieldGroup className="grid md:grid-cols-2 gap-6 mt-6">

<Field>
<FieldLabel>Department ID</FieldLabel>
<div className="mt-2 bg-muted/40 px-3 py-2 rounded-md">
{department._id}
</div>
</Field>

<Field>
<FieldLabel>Name</FieldLabel>
<div className="mt-2 bg-muted/40 px-3 py-2 rounded-md">
{department.name}
</div>
</Field>

<Field>
<FieldLabel>Code</FieldLabel>
<div className="mt-2 bg-muted/40 px-3 py-2 rounded-md">
{department.code}
</div>
</Field>

<Field>
<FieldLabel>Campus</FieldLabel>
<div className="mt-2 bg-muted/40 px-3 py-2 rounded-md">
{department.campusId?.name}
</div>
</Field>

<Field>
<FieldLabel>Institution</FieldLabel>
<div className="mt-2 bg-muted/40 px-3 py-2 rounded-md">
{department.campusId?.institutionId?.name}
</div>
</Field>

</FieldGroup>

</FieldSet>

</div>

</div>

)

}