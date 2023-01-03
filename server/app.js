import express from 'express'
import cors from 'cors'
import multer from 'multer'
//mit multer kann man auch andere Dateiformate hochladen. es gibt auch formidabel
import morgan from 'morgan'
//morgan ist logging middleware

const app = express()
const PORT = 4787
const upload = multer({ dest: './public' }) //hier wird gesagt, wo Multer die Bilder abspeichern soll

app.use(morgan('dev'))
app.use(cors())
app.use('/public', express.static('./public'))
// wenn der request mit /public beginnt, dann lege die middleware express.static('./public') fest

const posts = []

//hier der Name von upload.single('') ist der Name, den man festlegt für das Bild in de, Imputfeld in der Komponente Neuer Beitrag usw.  
app.post('/neuerbeitrag', upload.single('erstesBild'), (req, res) => {
    //post weil uploading passieren soll, nach der Route steht die middleware, hier ist das upload, wie oben definiert. Single sagt: eine Datei zur Zeit. Im Frontend muss dann ein Bild namens erstesBild existieren
    const post = {
        title: req.body.title,
        //den Pfad für das Bild braucht man noch, multer spezifischgeht das so:
        picture: req.file.path,
        //um im Thunder Client das Bild zu sehen muss man es erstesBild nennen, wie ober in der Post-Zeile
        text: req.body.text
    }
    posts.push(post)
    console.log(posts)
    res.json(posts)
})

//alle post holen 
app.get('/bestandsbeitrag', (_, res) => {
    res.json(posts)
})
app.listen(PORT, () => console.log("dieser server läuft auf: ", PORT))