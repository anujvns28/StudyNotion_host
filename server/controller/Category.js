const Category = require("../model/Category")

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
    try {
        //    fetching data 
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "all fild are required"
            })
        }



        const link = name.split(" ").join("-");

        console.log("links",link)
        // create entry in db
        const tag = await Category.create({
            name: name,
            description: description,
            link:link
        });

        // return response
        return res.status(200).json({
            success: true,
            message: "Entry Created in DB successfull"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })

    }
}



// get all caregories

exports.showAllCategories = async (req, res) => {
    try {

        console.log("cooming in category")
        // fetch all tag
        const allCategory = await Category.find({},
            {
                name: true,
                description: true,
                link:true
            });

        res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            allCategory,
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,

        })
    }
}


//showallCategoriesDetailse

exports.showAllCategoriesDetails = async (req, res) => {
    try {
        //get courseid
        console.log("cominnin.............")
        const categoryId  = req.body._id;

        

       
        //fetch data
        const selectedCategori = await Category.findById({_id:categoryId})
        .populate({
            path:"course",
            match: { status: "Published" },
            populate: {
                path: "instructor",
            },
        })
        .exec()
            
        console.log("////",selectedCategori)
        // vallidation
        if (!selectedCategori) {
            return res.json(500)({
                success: false,
                message: "can not find any course for this category"
            })
        }
        
        //getother course
        const outherCategoris = await Category.find(
            {
                _id: { $ne: categoryId }
            })

            console.log(outherCategoris[1]._id)

            let differentCategory = await Category.findOne(
                outherCategoris[getRandomInt(outherCategoris.length)]
                  ._id
              )    
            .populate({
                match: { status: "Published" },
                path:"course"
            })
            .exec();
        //top 10 sellling course
        
      
        
        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategori: selectedCategori,
                outherCategoris: differentCategory
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err.message,
            
        })
    }
}
