import { useState,useRef } from 'react'
import Navbar from './components/Navbar'
import Table_Row from './components/Table_Row'
import showIcon from './assets/show.png'
import hideIcon from './assets/hide.png'
import './App.css'

function App() {
  const [form, setform] = useState({
    Link: "",
    Username: "",
    password: ""
  })

  const password = useRef(null)
  const passicon = useRef(null)

  const [parsingarray, setparsingarray] = useState(() => {
    let password = localStorage.getItem("passwords")
    return password ? JSON.parse(password) : []
  })

  const inputchange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const showpassword = ()=>{
      if(password.current.type === 'password'){
        passicon.current.src = hideIcon
        password.current.type = 'text'
      }
      else{
        passicon.current.src = showIcon
        password.current.type = 'password'
      }
    }

  const saveinfo = () => {
    if (form.Username === "" || form.password.length < 5) {
      alert("Username cannot be empty and password must be at least 5 characters")
      return
    }

    const updatedPasswords = [...parsingarray, form]

    setparsingarray(updatedPasswords)
    localStorage.setItem(
      "passwords",
      JSON.stringify(updatedPasswords)
    )


    // Clear form after saving
    setform({
      Link: "",
      Username: "",
      password: ""
    })
  }

  const removerow = (indextodelete)=>{
    const updatedpassword = parsingarray.filter((_,index)=> index !== indextodelete)
    setparsingarray(updatedpassword)
    localStorage.setItem("passwords", JSON.stringify(updatedpassword))
  }

  const edit_entry = (indextoedit)=>{
    const current_edit = parsingarray.filter((_,index)=> index === indextoedit)
    const updatedpassword = parsingarray.filter((_,index)=> index !== indextoedit)
    setparsingarray(updatedpassword)
    localStorage.setItem("passwords",JSON.stringify(updatedpassword))
    setform(current_edit[0])
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />


        <div className="flex-1 bg-linear-to-r from-sky-50 to-sky-100 flex flex-col items-center py-10">

     
          <div className="w-full max-w-md flex flex-col gap-4">

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
              type="text"
              placeholder="Paste the link"
              name="Link"
              value={form.Link}
              onChange={inputchange}
            />

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm"
              type="text"
              placeholder="Username"
              name="Username"
              value={form.Username}
              onChange={inputchange}
            />

            <div className="relative">
              <input
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl shadow-sm"
                ref={password}
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={inputchange}
              />

              <img
                onClick={showpassword}
                ref={passicon}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                src={showIcon}
                alt="show password"
              />
            </div>

            <input
              className="bg-cyan-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-cyan-700 active:scale-95 transition"
              onClick={saveinfo}
              type="submit"
              value="Save"
            />
          </div>

          
          <div className="mx-20 mt-20 w-full max-w-5xl">
            {
              parsingarray.length > 0 ? (
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-cyan-600 text-white">
                      <th className="border px-4 py-2">Link</th>
                      <th className="border px-4 py-2">Username</th>
                      <th className="border px-4 py-2">Password</th>
                      <th className="border px-4 py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {parsingarray.map((item, index) => (
                      <Table_Row
                        key={index}
                        index={index}
                        Link={item.Link}
                        Username={item.Username}
                        password={item.password}
                        removepassword={removerow}
                        edit_entry={edit_entry}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                "Nothing to show"
              )
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default App