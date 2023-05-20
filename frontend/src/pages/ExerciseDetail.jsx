import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { exerciseOptions, fetchData,youtubeOptions } from '../utils/fetchData'
import Detail from '../components/Detail'
import SimilarExercises from '../components/SimilarExercises'
import ExerciseVideos from '../components/ExerciseVideos'

const ExerciseDetail = ({exercises}) => {
  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([])
  const [equipmentExercises, setEquipmentExercises] = useState([])


  const { id } = useParams()
  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl='https://exercisedb.p.rapidapi.com'
      const youtubeSearchUrl = 'youtube-media-downloader.p.rapidapi.com'
      

      // https://exercisedb.p.rapidapi.com/exercises/exercise/0001/
      // const exerciseDetailData=await fetchData(`${exerciseDbUrl}/exercises/exercise/${+id}`,exerciseOptions)
      // console.log({exerciseDetailData})
      // setExerciseDetail(exerciseDetailData)
      const result= exercises.find(item=>item.id===id)
      // console.log({result})
      setExerciseDetail(result)

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${result.name}`, youtubeOptions)
      console.log({exerciseVideosData})
      setExerciseVideos(exerciseVideosData.contents)

      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${result.target}`, exerciseOptions)
      setTargetMuscleExercises(targetMuscleExercisesData)
      
      const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${result.equipment}`, exerciseOptions)
      setEquipmentExercises(equipmentExercisesData)

    }
    fetchExercisesData();
  // console.log({})

  },[id])



  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={ targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>

  )
}

export default ExerciseDetail