"use client"

import api from "@/lib/api"
import { useEffect,useState } from "react"
import { useNavigate,useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"

import {
Field,
FieldDescription,
FieldGroup,
FieldLabel,
FieldLegend,
FieldSet,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import { ArrowLeft } from "lucide-react"

export default function EditDepartment(){

const navigate = useNavigate()
const { id } = useParams()

const [campuses,setCampuses] = useState([])

const [formData,setFormData] = useState({
campusId:"",
name:"",
code:""
})

const [loading,setLoading] = useState(false)
const [fetching,setFetching] = useState(true)

useEffect(()=>{

const loadData = async()=>{

try{

const dep = await api.get(`/api/v1/departments/${id}`)
const camp = await api.get("/api/v1/campuses")

setFormData({
campusId: dep.data.campusId?._id,
name: dep.data.name,
code: dep.data.code
})

setCampuses(camp.data.data)

}catch(error){

alert("Failed to load department")

}finally{

setFetching(false)

}

}

loadData()

},[id])

const handleChange = (e)=>{

const {id,value} = e.target

setFormData(prev=>({
...prev,
[id]:value
}))

}

const handleSubmit = async(e)=>{

e.preventDefault()

setLoading(true)

try{

await api.put(`/api/v1/departments/${id}`,formData)

navigate("/departments")

}catch(error){

alert("Update failed")

}finally{

setLoading(false)

}

}

if(fetching){
return <div className="p-6">Loading department...</div>
}

return(

<div className="p-2">

<div className="max-w-4xl">

<div className="mb-8">

<button
type="button"
onClick={()=>navigate(-1)}
className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-4"
>
<ArrowLeft className="h-4 w-4"/>
Back to Departments
</button>

<h2 className="text-2xl font-semibold">
Edit Department
</h2>

<p className="text-muted-foreground text-sm">
Update department details
</p>

</div>

<form className="space-y-8" onSubmit={handleSubmit}>

<FieldGroup>

<FieldSet>

<FieldLegend>Department Information</FieldLegend>

<FieldDescription>
Modify department details
</FieldDescription>

<FieldGroup className="grid md:grid-cols-2 gap-6 mt-4">

<Field>

<FieldLabel>Campus</FieldLabel>

<select
id="campusId"
value={formData.campusId}
onChange={handleChange}
className="border rounded-md h-10 px-3 w-full"
required
>

<option value="">Select Campus</option>

{campuses.map(c=>(
<option key={c._id} value={c._id}>
{c.name}
</option>
))}

</select>

</Field>

<Field>
<FieldLabel htmlFor="name">Department Name</FieldLabel>
<Input
id="name"
value={formData.name}
onChange={handleChange}
required
/>
</Field>

<Field>
<FieldLabel htmlFor="code">Department Code</FieldLabel>
<Input
id="code"
value={formData.code}
onChange={handleChange}
required
/>
</Field>

</FieldGroup>

</FieldSet>

<Field orientation="horizontal" className="gap-4 pt-4">

<Button
type="submit"
disabled={loading}
className="bg-blue-900 text-white hover:bg-blue-800"
>
{loading ? "Updating..." : "Update Department"}
</Button>

<Button
variant="outline"
type="button"
onClick={()=>navigate("/departments")}
>
Cancel
</Button>

</Field>

</FieldGroup>

</form>

</div>

</div>

)
}