import habitModel from "../models/habitModel.js"

const addHabit = async (req, res) => {
    try {
        const userId = req.user?.userId
        const { name, description, frequency } = req.body

        if (!name || !description || !frequency) {
            return res.status(401).json({ success: false, message: "all fields required" })
        }

        const currentData = new Date().toISOString()
        const newLogEntry = { date: currentData, completed: false }
        const logs = [newLogEntry]

        const newHabit = new habitModel({
            userId,
            name,
            description,
            frequency,
            logs
        })

        const  saveHabit = await newHabit.save()

        res.status(201).json({ success: true, message: "Habit added successfully", data: saveHabit })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

const deleteHabit = async (req, res) => {
    try {
      const habitId = req.params.id;
      
      const deletedHabit = await habitModel.findByIdAndDelete(habitId)

      if (!deleteHabit) {
        return res.status(404).json({ success: false, message: "Habit not found" })
      }

      res.status(200).json({ success: true, message: "Habit deleted successfully" })

    } catch (error) {
      console.log(error) 
        res.status(500).json({ success: false, message: "internal server error" })
      }  
    }

const getHabits = async (req, res) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(400).json({ success: false, message: "user not found" })

        }

        const habits = await habitModel.find({ userId }).exec()

        if (!habits.length || !habits.length === 0) {
            return res.status(404).json({ success: false, message: "no habits found" })
        }

        res.status(200).json({ success: true, data: habits })
    } catch (error) {
       console.log(error)
       res.status(500).json({ success: false, message: "internal server error" })
    }
}

const editHabits = async (req, res) => {
   try {
    const habitId = req.params;
    const userId = req.user?.id
    const { name, description, frequency,logs } = req.body
    
    const habit = await habitModel.findByIdAndUpdate(
        {_id: habitId, userId: userId  },
        { name, description, frequency, logs },
        { new: true }
    )

    if (!habit) {
        return res.status(404).json({ message: "Habit not found" })
    }

    res.status(200).json({ success: true, message: "Habit updated successfully", data: habit  })
   } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "internal server error" })
   }
}

const Markcompleted = async (req, res) => {
    const habitId = req.params.id;
    const today = new Date().toISOString().split("1")[0]
    try {
        const updatedHabit = await habitModel.findByIdAndUpdate(
          {_id: habitId },
          {
            $set: {
                "logs.$[log].completed": true
            }
        },
        {
            new: true,
            arrayFilters: [{ "log.date": today }]
        }  
        )

        if(!updatedHabit) {
            return res.status(404).json({ message: "habit not found" })
        }
    //   if logs array doesnt contain todays date, we need to add it

    if (!updatedHabit.logs.find(log => log.date === today)) {
        updatedHabit.logs.push({
            date: today,
            completed: true
        })

        await updatedHabit.save()
    }
        res.status(200).json({ success: true, message: "habit marked completed", data: updatedHabit })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: "Internal server error" })  
    }
}
export { addHabit, deleteHabit, getHabits, editHabits, Markcompleted }