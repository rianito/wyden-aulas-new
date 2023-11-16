import { useState, useEffect } from "react"

const baseUrl = "http://localhost:8080/api"

export default function useCrud(token: string): {
  courses: Course[]
  createCourse: (course: Course) => Promise<void>
  updateCourse: (course: Course) => Promise<void>
  deleteCourse: (course: Course) => Promise<void>
} {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    readCourses()
  }, [])

  async function readCourses() {
    try {
      const response = await fetch(`${baseUrl}/aulas`)
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.error("Erro ao obter os dados:", error)
    }
  }

  async function createCourse(course: Course) {
    const courseToBeCreated = {
      name: course.name,
      code: course.code,
      period: course.period,
      teacher: course.teacher,
      room: course.room,
      sia: course.sia,
      building: course.building,
      floor: course.floor,
      weekday: course.weekday
    }
    try {
      const response = await fetch(`${baseUrl}/aulas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(courseToBeCreated),
      })
      const newCourse = await response.json()
      setCourses([...courses, newCourse])
    } catch (error) {
      console.error("Erro ao criar o item:", error)
    }
  }

  async function updateCourse(course: Course) {
    try {
      const response = await fetch(`${baseUrl}/aulas/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(course),
      })
      const updatedCourse = await response.json()
      const newCourses = courses.map((course) => {
        if (course.id === updatedCourse.id) {
          return updatedCourse
        }
        return course
      })
      setCourses(newCourses)
    } catch (error) {
      console.error("Erro ao atualizar o item:", error)
    }
  }

  async function deleteCourse(course: Course) {
    try {
      const response = await fetch(`${baseUrl}/aulas/${course.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      const deletedCourse = await response.json()

      setCourses(
        courses.filter((course) => {
          return course.id !== deletedCourse.id
        })
      )
    } catch (error) {
      console.error("Erro ao excluir o item:", error)
    }
  }

  return { courses, createCourse, updateCourse, deleteCourse }
}
