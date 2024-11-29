import TeacherSideMenu from "../TeacherSideMenu"
import { Button,Table } from "react-bootstrap"
import { useEffect } from "react"
function TeacherMyStudents(){
    useEffect(()=>{
        document.title="My Students | Teacher"
    })
    return(
        <div className="container">
            <div className="row">
            <aside className="col-md-3">
                <TeacherSideMenu/>
            </aside>
            <section className="col-md-9">
                <div className="card">
                    <h5 className="card-header">My Students</h5>
                    <div className="card-body">
                        <Table striped bordered>
                            <thead>
                                <tr><th>Name</th>
                                <th>Subject</th>
                                <th colSpan={2} className="text-center">Action</th></tr>
                            </thead>
                            <tbody>
                                <td>Ravi Bishnoi</td>
                                <td>Graph Theory</td>
                                <td>
                                    <Button size="sm">View</Button>
                                </td>
                                <td>
                                    <Button size="sm">Delete</Button>
                                </td>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </section>
            </div>
        </div>
    )
}

export default TeacherMyStudents