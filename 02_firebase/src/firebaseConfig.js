import firebase from 'firebase/app'
import 'firebase/firestore'
require('firebase/auth');

// firebase init goes here
const config = {
	apiKey: "AIzaSyCm_dQWiiZ3g-lgqR_MsDsR4kIAgV1EzRQ",
	authDomain: "practice-vue-686c2.firebaseapp.com",
	databaseURL: "https://practice-vue-686c2.firebaseio.com",
	projectId: "practice-vue-686c2",
	storageBucket: "practice-vue-686c2.appspot.com",
	messagingSenderId: "G-162619770645"

}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
	timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
	db,
	auth,
	currentUser,
	usersCollection,
	postsCollection,
	commentsCollection,
	likesCollection
}
