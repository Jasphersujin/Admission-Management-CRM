"use client"

import api from "@/lib/api"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Button } from "@/components/ui/button"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import { ArrowLeft } from "lucide-react"

export default function EditCampus() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [institutions,setInstitutions] = useState([])

  const [formData,setFormData] = useState({
    institutionId:"",
    name:"",
    location:""
  })

  const [loading,setLoading] = useState(false)
  const [fetching,setFetching] = useState(true)

  useEffect(()=>{

    const loadData = async()=>{

      try{

        const campus = await api.get(`/api/v1/campuses/${id}`)
        const inst = await api.get("/api/v1/institutions")

        setFormData({
          institutionId: campus.data.institutionId?._id,
          name: campus.data.name,
          location: campus.data.location
        })

        setInstitutions(inst.data.data)

      }catch(error){

        console.error(error)
        alert("Failed to load campus")

      }finally{

        setFetching(false)

      }

    }

    loadData()

  },[id])


  const handleBack = ()=>{
    navigate(-1)
  }

  const handleCancel = ()=>{
    navigate("/campuses")
  }

  const handleChange = (e)=>{

    const {id,value} = e.target

    setFormData(prev=>({
      ...prev,
      [id]:value
    }))

  }

  const updateField = (field, value) => {
    setFormData(prev => ({
    ...prev,
    [field]: value
    }))
  }


  const handleSubmit = async(e)=>{

    e.preventDefault()

    setLoading(true)

    try{

      await api.put(
        `/api/v1/campuses/${id}`,
        formData
      )

      navigate("/campuses")

    }catch(error){

      alert(error.response?.data?.message || "Update failed")

    }finally{

      setLoading(false)

    }

  }


  if(fetching){
    return <div className="p-6">Loading campus...</div>
  }

  return (

    <div className="p-2">

      <div className="max-w-4xl">

        <div className="mb-8">

          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-4"
          >
            <ArrowLeft className="h-4 w-4"/>
            Back to Campuses
          </button>

          <h2 className="text-2xl font-semibold">
            Edit Campus
          </h2>

          <p className="text-muted-foreground text-sm">
            Update campus details below.
          </p>

        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>

          <FieldGroup>

            <FieldSet>

              <FieldLegend>Campus Information</FieldLegend>

              <FieldDescription>
                Modify campus details
              </FieldDescription>

              <FieldGroup className="grid md:grid-cols-2 gap-6 mt-4">

                <Field>

                  <FieldLabel htmlFor="institutionId">
                    Institution
                  </FieldLabel>
                  <Select
                    value={formData.institutionId}
                    onValueChange={(value)=>updateField("institutionId",value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Institution" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Institutions</SelectLabel>

                        {institutions.map((inst) => (
                          <SelectItem
                            key={inst._id}
                            value={inst._id}
                          >
                            {inst.name}
                          </SelectItem>
                        ))}

                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {/* <select
                    id="institutionId"
                    value={formData.institutionId}
                    onChange={handleChange}
                    className="border rounded-md h-10 px-3 w-full"
                    required
                  >

                    <option value="">
                      Select Institution
                    </option>

                    {institutions.map(inst=>(
                      <option
                        key={inst._id}
                        value={inst._id}
                      >
                        {inst.name}
                      </option>
                    ))}

                  </select> */}

                </Field>

                <Field>
                  <FieldLabel htmlFor="name">
                    Campus Name
                  </FieldLabel>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="location">
                    Location
                  </FieldLabel>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
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
                {loading ? "Updating..." : "Update Campus"}
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