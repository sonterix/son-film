import { useHistory } from 'react-router'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { object, string } from 'yup'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { XIcon } from '@primer/octicons-react'

import useStorage from 'hooks/useStorage'
import { FilmInterface } from 'types/films.interface'
import styles from './AddOrEditFilm.module.scss'

const AddOrEditFilm = (): JSX.Element => {
  // Get storage from context
  const {
    firebase: { storage, database }
  } = useStorage()

  const { push } = useHistory()

  const validation = object({
    filmImg: string().required('Required field'),
    slug: string()
      .matches(/^[a-z+-]+/g, 'Enter string in forms one-two-three')
      .required('Required field'),
    name: string().required('Required field'),
    originalName: string().required('Required field'),
    ratingIMDb: string()
      .matches(/^([0-9]\.[0-9])$/g, 'Enter rating in format 0.0')
      .required('Required field'),
    description: string().required('Required field'),
    type: string().required('Required field'),
    status: string().required('Required field'),
    year: string()
      .matches(/(19[0-9][0-9]|20[0-2][0-9])/g, 'Enter valide year')
      .required('Required field'),
    country: string().required('Required field'),
    genre: string().required('Required field'),
    director: string().required('Required field'),
    actors: string().required('Required field'),
    iframeUrl: string().required('Required field')
  })

  const initialValues: FilmInterface = {
    uid: '',
    filmImg: '',
    slug: '',
    name: '',
    originalName: '',
    ratingIMDb: '',
    description: '',
    type: '',
    status: '',
    year: '',
    country: '',
    genre: '',
    director: '',
    actors: '',
    iframeUrl: ''
  }

  const handleUploadImage = async (
    imageFile: File | null,
    handleSetFormField: (field: string, value: any) => void
  ): Promise<void> => {
    if (!imageFile) return

    const storageRef = ref(storage, `films/posters/${Date.now()}-${imageFile.name}`)
    // Upload image to firestore storage
    await uploadBytes(storageRef, imageFile)
    // Get uploaded image url
    const imageURL = await getDownloadURL(storageRef)
    // Set image url to the formik values
    handleSetFormField('filmImg', imageURL)
  }

  const handleSubmitForm = async (
    values: FilmInterface,
    { resetForm }: FormikHelpers<FilmInterface>
  ): Promise<void> => {
    try {
      const filmId = uuid()
      // Save film data in firebase
      await setDoc(doc(database, 'films', filmId), { ...values, uid: filmId })
      // Reset form and redirect
      resetForm()
      push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className={`container-small ${styles.AddOrEditFilm}`}>
      <h3 className={styles.PageTitle}>Add New Film</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={handleSubmitForm}
        enableReinitialize
      >
        {({ isSubmitting, errors, values, setFieldValue }) => (
          <Form>
            <div className={styles.FormTop}>
              <div className={styles.LeftSide}>
                {values.filmImg ? (
                  <div className={styles.ImagePreview}>
                    <button
                      type="button"
                      className={styles.XMarkBtn}
                      onClick={() => setFieldValue('filmImg', '')}
                    >
                      <XIcon size={20} />
                    </button>
                    <img src={values.filmImg} alt="film poster" />
                  </div>
                ) : (
                  <label className={styles.ImageSelector}>
                    <input
                      type="file"
                      name="filmImg"
                      accept="image/png, image/jpeg"
                      onChange={({ currentTarget: { files } }) =>
                        handleUploadImage(files?.length ? files[0] : null, setFieldValue)
                      }
                    />
                    <span>Select Image</span>
                  </label>
                )}
              </div>

              <div className={styles.RightSide}>
                <div className={styles.InputBox}>
                  <label htmlFor="slugField">Slug</label>
                  <Field id="slugField" name="slug" placeholder="intouchables" />
                  <ErrorMessage name="slug" component="span" />
                </div>

                <div className={styles.InputBox}>
                  <label htmlFor="nameField">Name</label>
                  <Field id="nameField" name="name" placeholder="Неприкасаемые" />
                  <ErrorMessage name="name" component="span" />
                </div>

                <div className={styles.InputBox}>
                  <label htmlFor="originalNameField">Original Name</label>
                  <Field id="originalNameField" name="originalName" placeholder="Intouchables" />
                  <ErrorMessage name="originalName" component="span" />
                </div>
              </div>
            </div>

            <div className={styles.InputBox}>
              <label htmlFor="descriptionField">Description</label>
              <Field
                id="descriptionField"
                name="description"
                placeholder="В кино драме 'Неприкасаемые' как-то раз проходил отбор на лучшую сиделку..."
                component="textarea"
                rows="4"
              />
              <ErrorMessage name="description" component="span" />
            </div>

            <div className={styles.InputBox}>
              <label htmlFor="typeField">Type</label>
              <Field id="typeField" name="type" placeholder="Кино" />
              <ErrorMessage name="type" component="span" />
            </div>

            <div className={styles.InputBox}>
              <label htmlFor="ratingIMDbField">IMDb Rating</label>
              <Field type="number" id="ratingIMDbField" name="ratingIMDb" placeholder="8.5" />
              <ErrorMessage name="ratingIMDb" component="span" />
            </div>

            <div className={styles.InputBox}>
              <label htmlFor="statusField">Status</label>
              <Field id="statusField" name="status" placeholder="Снимается" />
              <ErrorMessage name="status" component="span" />
            </div>

            <div className={styles.InputBox}>
              <label htmlFor="yearField">Year</label>
              <Field type="number" id="yearField" name="year" placeholder="2011" />
              <ErrorMessage name="year" component="span" />
            </div>

            <div className={styles.InputBox}>
              <label htmlFor="countryField">Country</label>
              <Field id="countryField" name="country" placeholder="Франция" />
              <ErrorMessage name="country" component="span" />
            </div>

            <div className={styles.InputBox}>
              <label htmlFor="genreField">Genre</label>
              <Field id="genreField" name="genre" placeholder="биография, драма, комедия" />
              <ErrorMessage name="genre" component="span" />
            </div>

            <div className={styles.InputBox}>
              <label htmlFor="directorField">Director</label>
              <Field id="directorField" name="director" placeholder="Оливье Накаш, Эрик Толедано" />
              <ErrorMessage name="director" component="span" />
            </div>

            <div className={styles.InputBox}>
              <label htmlFor="actorsField">Actors</label>
              <Field
                id="actorsField"
                name="actors"
                placeholder="Франсуа Клюзе, Омар Си, Анн Ле Ни, Одри Флеро, ..."
              />
              <ErrorMessage name="actors" component="span" />
            </div>

            <div className={styles.InputBox}>
              <label htmlFor="iframeUrlField">Film Iframe URL</label>
              <Field
                id="iframeUrlField"
                name="iframeUrl"
                placeholder="https://cdn0991.fun/v/535341"
              />
              <ErrorMessage name="iframeUrl" component="span" />
            </div>

            <button
              type="submit"
              className={`orange-btn ${styles.AddBtn}`}
              disabled={isSubmitting || !!Object.values(errors).length}
            >
              Add Film
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default AddOrEditFilm
