"use client"

import api from "@/lib/api"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"

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

export default function AddDepartment(){

const navigate = useNavigate()

const [campuses,setCampuses] = useState([])

const [formData,setFormData] = useState({
campusId:"",
name:"",
code:""
})

const [loading,setLoading] = useState(false)

useEffect(()=>{

const loadCampuses = async()=>{

const res = await api.get("/api/v1/campuses")

setCampuses(res.data.data)

}

loadCampuses()

},[])

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

await api.post("/api/v1/departments",formData)

navigate("/departments")

}catch(error){

alert(error.response?.data?.message || "Failed")

}finally{

setLoading(false)

}

}

const handleBack = ()=>navigate(-1)

const handleCancel = ()=>navigate("/departments")

return(

<div className="p-2">

<div className="max-w-4xl">

<div className="mb-8">

<button
type="button"
onClick={handleBack}
className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-4"
>
<ArrowLeft className="h-4 w-4"/>
Back to Departments
</button>

<h2 className="text-2xl font-semibold">
Department Form
</h2>

<p className="text-muted-foreground text-sm">
Add department details
</p>

</div>

<form className="space-y-8" onSubmit={handleSubmit}>

<FieldGroup>

<FieldSet>

<FieldLegend>Department Information</FieldLegend>

<FieldDescription>
Enter department details
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
{loading ? "Saving..." : "Save Department"}
</Button>

<Button
variant="outline"
type="button"
onClick={handleCancel}
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