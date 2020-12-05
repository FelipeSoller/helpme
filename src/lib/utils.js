module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }
        return age
    },
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {            
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
        
    },
    graduation(degrees) {
        if (degrees == "Secondary") {
            return "Secondary school";
        } else if (degrees == "Bachelor") {
            return "Bachelor’s degree";
        } else if (degrees == "Master") {
            return "Master’s degree";
        } else if (degrees == "Doctoral") {
            return "Doctoral degree";
        }
    },
    education(grade) {
        if (grade == "5grade") {
            return "Elementary School - 5th Grade";
        } else if (grade == "6grade") {
            return "Elementary School - 6th Grade";
        } else if (grade == "7grade") {
            return "Middle School - 7th Grade";
        } else if (grade == "8grade") {
            return "Middle School - 8th Grade";
        } else if (grade == "freshman") {
            return "High School - Freshman";
        } else if (grade == "sophomore") {
            return "High School - Sophomore";
        } else if (grade == "junior") {
            return "High School - Junior";
        } else if (grade == "senior") {
            return "High School - Senior";
        } 
    }
}