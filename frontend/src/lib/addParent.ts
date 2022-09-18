import { CommonFirestore } from '@common'
import { setDoc, addDoc, collection, getDoc, doc } from 'firebase/firestore'
import { db } from '~/firebase/init'
import { Firestore } from '~/types'

export const addParent = async (
  setError: React.Dispatch<React.SetStateAction<number>>,
  parent: { name: string; area: string; userId: string },
  children: { name: string; deviceId: string; schoolId: string }[]
) => {

  function putError(errorMessage:string, errorno:number, toerror:React.Dispatch<React.SetStateAction<number>>) {
    toerror(errorno);
    return Error(errorMessage);
  }

  await setDoc(
    doc(db, 'parents', parent.userId).withConverter(
      Firestore.converter(CommonFirestore.Parent)
    ),
    {
      name: parent.name,
      area: parent.area,
    }
  )

  children.forEach(async (child) => {
    const deviceRef = doc(db, 'devices', child.deviceId).withConverter(
      Firestore.converter(Firestore.Device)
    )

    if (!(await getDoc(deviceRef)).exists()) {
      throw putError("Device does not exist.", 2, setError);
    }

    const schoolRef = doc(db, 'schools', child.schoolId).withConverter(
      Firestore.converter(CommonFirestore.School)
    )

    if (!(await getDoc(schoolRef)).exists()) {
      throw putError("School does not exist.", 3, setError); //School does not exist.
    }

    await addDoc(
      collection(db, 'parents', parent.userId, 'children').withConverter(
        Firestore.converter(Firestore.Child)
      ),
      {
        name: child.name,
        deviceRef,
        schoolRef,
      }
    )
  })

  return {
    childrenDocIds: children.map((child) => child.deviceId),
  }
}
