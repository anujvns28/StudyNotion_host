import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import ConfirmationModel from "../../../components/common/ConfirmationModel"
import { deleteSection, deleteSubSection } from "../../../service/operations/courseDetailsApi"
import { setCourse } from "../../../slices/courseSlice"
import SubSectionModal from "./SubSectionModal"
const NestedView = ({ handleChangeEditSectionName }) => {

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [showLecture, setshowLecture] = useState(true);
  const [modalData, setmodalData] = useState(null);
  const [subsectionModal, setSubsectinModal] = useState(false);
  const [viewSubsectionModal, setViewSubsectionModal] = useState(null);
  const [editeSubsectinModal, setEditSubsectionModal] = useState(null);
  const [sectionid, setsectionid] = useState(null)
  const dispatch = useDispatch();



  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId: sectionId,
      courseId: course._id
    });
    if (result) {
      dispatch(setCourse(result));
    }
    setmodalData(null)
  }

  const handleDeleteSubsection = async (sectionId, subSectionid) => {
    const result = await deleteSubSection({
      sectionId: sectionId,
      subSectionId: subSectionid
    }, token)

    const updatedCourseContent = course.courseCountant.map((section) =>
      section._id === sectionId ? result : section
    )
    const updateCourse = { ...course, courseCountant: updatedCourseContent };
    dispatch(setCourse(updateCourse));

    console.log(result);
    setmodalData(null)
  }

  const addSubSectionModal = (data) => {
    setSubsectinModal(true);
    setsectionid(data)
  }



  const shoSubsectionModla = (data) => {
    setSubsectinModal(data);
    setViewSubsectionModal(data);
    setEditSubsectionModal(data);
  }
  console.log("coursecontexxxx",course.courseCountant)

  return (
    <div
      className="rounded-lg bg-richblack-700 p-6 px-8 "
      id="nestedViewContainer"
    >
      {course.courseCountant.map((item, index) => (

        // Section Dropdown
        <details key={index} open >
          {/* Section Dropdown Content */}
          <summary
            className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
            <div className="flex items-center gap-x-3">
              <RxDropdownMenu className="text-2xl text-richblack-50" />
              <p className="font-semibold text-richblack-50">
                {item.sectionName}
              </p>
            </div>
            <div className="flex items-center gap-x-3">

              {/* edit button */}
              <button onClick={() => handleChangeEditSectionName(item._id, item.sectionName)}>
                <MdEdit className="text-xl text-richblack-300" />
              </button>

              {/* delete button  */}
              <button onClick={() => setmodalData({
                text1: "Delete this Section?",
                text2: "All the lectures in this section will be deleted",
                btn1: "Delete",
                btn2: "Cancel",
                handler1: () => handleDeleleSection(item._id),
                handler2: () => setmodalData(null),
              })}>
                <RiDeleteBin6Line className="text-xl text-richblack-300" />
              </button>

              <span className="font-medium text-richblack-300">|</span>
              <AiFillCaretDown className={`text-xl text-richblack-300`} />
            </div>

          </summary>

          {/* subsection............................ */}

          <div className="px-6 pb-4">
            {/* Render All Sub Sections Within a Section */}
            {item.subSection.map((data) => (
              <div
                key={data._id}

                className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
              >
                <div onClick={() => setViewSubsectionModal(data)}
                  className="flex items-center gap-x-3 py-2 w-[85%] ">
                  <RxDropdownMenu
                    className="text-2xl text-richblack-50" />
                  <p className="font-semibold text-richblack-50">
                    {data.title}
                  </p>
                </div>
                <div

                  className="flex items-center gap-x-3"
                >
                {/* editing */}

                  <button onClick={() =>setEditSubsectionModal(data)}>
                    <MdEdit className="text-xl text-richblack-300" />
                  </button>

                  {/* deltting */}
                  <button onClick={() => setmodalData({
                    text1: "Delete this Sub-Section?",
                    text2: "This lecture will be deleted",
                    btn1: "Delete",
                    btn2: "Cancel",
                    handler1: () => handleDeleteSubsection(item._id, data._id),
                    handler2: () => setmodalData(null),
                  })}>
                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                  </button>
                </div>
              </div>
            ))}

          </div>

          {
            <button onClick={() => addSubSectionModal(item._id)}
              className="mt-3 flex items-center gap-x-1 text-yellow-50"
            >
              <FaPlus className="text-lg" />
              <p>Add Lecture</p>
            </button>
              
          }
{/* adding lecture */}
{subsectionModal ? (
        <SubSectionModal shoSubsectionModla={shoSubsectionModla} sectionId={sectionid} add={true} />
      ) : (
        <></>
      )}
      {/* viewing lecture */}
      {
        viewSubsectionModal ? (<SubSectionModal
          shoSubsectionModla={shoSubsectionModla}
          sectionId={item._id}
          subSection={viewSubsectionModal}
          view={true}
        />)
          : (<div></div>)
      }
      {/* editeing */}
      {
        editeSubsectinModal ? (<SubSectionModal
        subSection={editeSubsectinModal}
          shoSubsectionModla={shoSubsectionModla}
          sectionId={item._id}
          edit={true}
        />)
          : (<div></div>)
      }


        </details>

      ))}



      {/* confirmation modla */}
      {modalData ? (
        <ConfirmationModel modelData={modalData} />
      ) : (
        <></>
      )}

      

    </div>
  )
}

export default NestedView
