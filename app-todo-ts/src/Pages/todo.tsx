import { Footer } from "../components/todoComponents/Footer"
import { Header } from "../components/todoComponents/header/Header"
import { Task } from "../components/todoComponents/Task"

export const TodoApp = () => {



    return (
        <div className="ContainerMain">
            <div className="ContainerTodo">
                <Header />
                <Task />
                <Footer />
            </div>
        </div>


    )


}