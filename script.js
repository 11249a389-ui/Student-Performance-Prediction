function predictPerformance() {



    const studentId =
        document.getElementById("studentId").value;

    const studentName =
        document.getElementById("studentName").value;

    const attendance =
        Number(document.getElementById("attendance").value);

    const studyHours =
        Number(document.getElementById("studyHours").value);

    const internalMarks =
        Number(document.getElementById("internalMarks").value);

    const assignmentMarks =
        Number(document.getElementById("assignmentMarks").value);

    const previousGpa =
        Number(document.getElementById("previousGpa").value);


    

    if (
        !studentId ||
        !studentName ||
        isNaN(attendance) ||
        isNaN(studyHours) ||
        isNaN(internalMarks) ||
        isNaN(assignmentMarks) ||
        isNaN(previousGpa)
    ) {

        alert("Please enter all student details.");

        return;
    }


    if (attendance < 0 || attendance > 100) {

        alert("Attendance must be between 0 and 100.");

        return;
    }


    if (internalMarks < 0 || internalMarks > 100) {

        alert("Internal marks must be between 0 and 100.");

        return;
    }


    if (assignmentMarks < 0 || assignmentMarks > 100) {

        alert("Assignment marks must be between 0 and 100.");

        return;
    }


    if (previousGpa < 0 || previousGpa > 10) {

        alert("Previous GPA must be between 0 and 10.");

        return;
    }


    
    let predictedCgpa =
        (
            (attendance / 100) * 2.0 +
            (studyHours / 10) * 1.5 +
            (internalMarks / 100) * 2.0 +
            (assignmentMarks / 100) * 1.5 +
            (previousGpa / 10) * 2.5
        );


  

    predictedCgpa =
        Math.max(0, Math.min(10, predictedCgpa));


    predictedCgpa =
        predictedCgpa.toFixed(2);


  

    const percentage =
        (Number(predictedCgpa) * 10).toFixed(2);


    

    let performance;


    if (Number(predictedCgpa) >= 9) {

        performance = "Excellent";

    }
    else if (Number(predictedCgpa) >= 8) {

        performance = "Very Good";

    }
    else if (Number(predictedCgpa) >= 7) {

        performance = "Good";

    }
    else if (Number(predictedCgpa) >= 6) {

        performance = "Average";

    }
    else {

        performance = "Needs Improvement";

    }


    

    document.getElementById("predictedCgpa").textContent =
        predictedCgpa;


    document.getElementById("predictedPercentage").textContent =
        percentage + "%";


    document.getElementById("performance").textContent =
        performance;


    

    document.getElementById("attendanceBar").style.width =
        attendance + "%";

    document.getElementById("attendanceValue").textContent =
        attendance + "%";


    document.getElementById("internalBar").style.width =
        internalMarks + "%";

    document.getElementById("internalValue").textContent =
        internalMarks + "%";


    document.getElementById("assignmentBar").style.width =
        assignmentMarks + "%";

    document.getElementById("assignmentValue").textContent =
        assignmentMarks + "%";


    const gpaPercentage =
        (previousGpa / 10) * 100;


    document.getElementById("gpaBar").style.width =
        gpaPercentage + "%";

    document.getElementById("gpaValue").textContent =
        previousGpa;


    

    document.getElementById("resultSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}
