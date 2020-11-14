import app from '../firebase'

app.auth().signInWithEmailAndPassword('happyeric77@gmail.com', 'd9133102.').then((result)=>{
  console.log(result)
})

function App() {
  return <div className="h1">Hellow world</div>
}

export default App;
