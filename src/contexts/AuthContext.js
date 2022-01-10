import React, {useState, useEffect} from 'react'
import {auth, db, storage} from '../firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged} from 'firebase/auth'
import {collection, addDoc, getDocs, updateDoc, doc, arrayUnion, arrayRemove} from 'firebase/firestore'
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage'

export const AuthContext = React.createContext()

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [users, setUsers] = useState()
    const usersCollection = collection(db, "users")   

const signUp = async (username, email, password) => {
    await createUserWithEmailAndPassword(auth, email, password).then((data) => (
        createUser(username, email, data.user.uid)
        ));
    window.location.reload()
}

const createUser = async (username, email, uid) => {
    await addDoc(usersCollection, {username: username, email: email, uid: uid, tracks: []})
}

const logIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
}

const logOut = () => {
    signOut(auth)
}

const forgotPassword = async (email) => {
    await sendPasswordResetEmail(auth, email)
}

const uploadTrackInDB = async (currentUserDB, imageUrl, audioUrl, trackTitle, trackArtist, imageName, audioName ) => {
    const userDoc = doc(db, "users", currentUserDB.id)
    await updateDoc(userDoc, {tracks: arrayUnion({trackTitle, trackArtist, audioUrl, imageUrl, imageName, audioName})})

}

const uploadTrackInStorage = async (imageFile, audioFile, trackTitle, trackArtist, currentUserDB) => {
    const imageFileRef = ref(storage, `users/${currentUser.uid}/` + imageFile.name)
    const audioFileRef = ref(storage, `users/${currentUser.uid}/` + audioFile.name)
    await uploadBytes(imageFileRef, imageFile )
    await uploadBytes(audioFileRef, audioFile )
    const imageUrl = await getDownloadURL(imageFileRef)
    const audioUrl = await getDownloadURL(audioFileRef)
    const imageName = imageFile.name
    const audioName = audioFile.name
    await uploadTrackInDB(currentUserDB, imageUrl, audioUrl, trackTitle, trackArtist, imageName, audioName)
    window.location.reload()
}

const deleteTrackInStorage = async (imageFileName, audioFileName) => {
    const imageFileRef = ref(storage, `users/${currentUser.uid}/` + imageFileName)
    const audioFileRef = ref(storage, `users/${currentUser.uid}/` + audioFileName)
    await deleteObject(imageFileRef)
    await deleteObject(audioFileRef)
}

const deleteTrackInDB = async (idx, currentUserDB, imageFileName, audioFileName) => {
    const userDoc = doc(db, "users", currentUserDB.id)
    await updateDoc(userDoc, {tracks: arrayRemove(currentUserDB.tracks[idx])})
    await deleteTrackInStorage(imageFileName, audioFileName)
    window.location.reload()
}

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
    })
    const getUsers = async () => {
        const data = await getDocs(usersCollection)
        setUsers(data.docs.map(doc => (
            {...doc.data(), id: doc.id}
        )))
    }
    getUsers()
    return unsubscribe
}, [])

const value = {
    currentUser,
    users,
    signUp,
    logIn,
    logOut,
    forgotPassword,
    uploadTrackInStorage,
    deleteTrackInDB,
}

    return (
        <div>
            <AuthContext.Provider value={value}> 
            {children}
            </AuthContext.Provider>
        </div>
    )
}
