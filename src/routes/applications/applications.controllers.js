// const index = (req, res, next) => {
//     Application.query()
//     .then(applications => res.json({data: applications}))
//     .catch(error => next(error))
// }

// const get = (req, res, next) => {
//     return Application.query()
//     .where("applications.id", req.params.id)
//     .then(applications => {
//         if(applications.length > 0) {
//             return res.json({
//                 data: applications[0]
//             })
//         }
//         throw error
//     })
// }

// const create = (req, res, next) => {
//     return Application.insertApplciation(req.body)
//     .then((application)=>{return res.json(application)})
//     .catch((error)=> throw error)
// }

const Application = require('./applications.model')

exports.list = async (req, res, next) => {
  try {
    const applications = await Application.query().eager('user')
    res.json({ data: applications })
  } catch (error) {
    next(error)
  }
}

exports.get = async (req, res, next) => {
  try {
    const application = await Application.getApplicationById(req.params.id)
    res.json({ data: application })
  } catch (error) {
    next(error)
  }
}

exports.create = async (req, res, next) => {
  try {
    const application = await Application.insertApplication(req.body)
    res.json({ data: application })
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  try {
    const application = await Application.updateApplication(
      req.params.id,
      req.body
    )
    res.json({ data: application })
  } catch (error) {
    next(error)
  }
}

exports.remove = async (req, res, next) => {
  try {
    await Application.deleteApplication(req.params.id)
    res.json({ data: { id: req.params.id } })
  } catch (error) {
    next(error)
  }
}
