let predictionChart = null;

let performanceChart = null;


function predictPerformance() {

    // Get values

    const studentId =
        document.getElementById("studentId").value;

    const studentName =
        document.getElementById("studentName").value;

    const attendance =
        Number(
            document.getElementById("attendance").value
        );

    const studyHours =
        Number(
            document.getElementById("studyHours").value
        );

    const internalMarks =
        Number(
            document.getElementById("internalMarks").value
        );

    const assignmentMarks =
        Number(
            document.getElementById("assignmentMarks").value
        );

    const previousGpa =
        Number(
            document.getElementById("previousGpa").value
        );


    // Validate

    if (
        !studentId ||
        !studentName ||
        isNaN(attendance) ||
        isNaN(studyHours) ||
        isNaN(internalMarks) ||
        isNaN(assignmentMarks) ||
        isNaN(previousGpa)
    ) {

        alert(
            "Please enter all student details."
        );

        return;

    }


    if (
        attendance < 0 ||
        attendance > 100
    ) {

        alert(
            "Attendance must be between 0 and 100."
        );

        return;

    }


    if (
        internalMarks < 0 ||
        internalMarks > 100
    ) {

        alert(
            "Internal marks must be between 0 and 100."
        );

        return;

    }


    if (
        assignmentMarks < 0 ||
        assignmentMarks > 100
    ) {

        alert(
            "Assignment marks must be between 0 and 100."
        );

        return;

    }


    if (
        previousGpa < 0 ||
        previousGpa > 10
    ) {

        alert(
            "Previous GPA must be between 0 and 10."
        );

        return;

    }


    /*
    ------------------------------------------------
    TEMPORARY CALCULATION
    ------------------------------------------------

    This is only for the frontend demonstration.

    Later we will connect this button to your
    REAL Python Linear Regression model.
    */


    let predictedCgpa =

        (
            (attendance / 100) * 2.0 +

            (studyHours / 10) * 1.5 +

            (internalMarks / 100) * 2.0 +

            (assignmentMarks / 100) * 1.5 +

            (previousGpa / 10) * 2.5

        );


    // Keep CGPA between 0 and 10

    predictedCgpa =

        Math.max(
            0,
            Math.min(10, predictedCgpa)
        );


    predictedCgpa =
        Number(
            predictedCgpa.toFixed(2)
        );


    // Percentage

    const percentage =

        Number(
            (predictedCgpa * 10).toFixed(2)
        );


    // Performance

    let performance;


    if (predictedCgpa >= 9) {

        performance = "Excellent";

    }

    else if (predictedCgpa >= 8) {

        performance = "Very Good";

    }

    else if (predictedCgpa >= 7) {

        performance = "Good";

    }

    else if (predictedCgpa >= 6) {

        performance = "Average";

    }

    else {

        performance =
            "Needs Improvement";

    }


    // Display result

    document.getElementById(
        "predictedCgpa"
    ).textContent = predictedCgpa;


    document.getElementById(
        "predictedPercentage"
    ).textContent =
        percentage + "%";


    document.getElementById(
        "performance"
    ).textContent =
        performance;


    // Draw graphs

    createPredictionChart(
        predictedCgpa,
        percentage
    );


    createPerformanceChart(
        attendance,
        internalMarks,
        assignmentMarks,
        previousGpa
    );

}


/*
================================================
GRAPH 1
CGPA + PERCENTAGE
================================================
*/

function createPredictionChart(
    cgpa,
    percentage
) {

    const canvas =
        document.getElementById(
            "predictionChart"
        );


    if (predictionChart !== null) {

        predictionChart.destroy();

    }


    predictionChart =
        new Chart(
            canvas,
            {

                type: "bar",

                data: {

                    labels: [
                        "Predicted CGPA",
                        "Predicted Percentage"
                    ],

                    datasets: [

                        {

                            label:
                                "Prediction",

                            data: [
                                cgpa,
                                percentage
                            ],

                            borderWidth: 1

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {

                        y: {

                            beginAtZero: true,

                            max: 100,

                            title: {

                                display: true,

                                text:
                                    "Value"

                            }

                        }

                    },

                    plugins: {

                        legend: {

                            display: true

                        },

                        title: {

                            display: true,

                            text:
                                "Predicted CGPA and Percentage"

                        }

                    }

                }

            }
        );

}


/*
================================================
GRAPH 2
STUDENT INPUT ANALYSIS
================================================
*/

function createPerformanceChart(
    attendance,
    internalMarks,
    assignmentMarks,
    previousGpa
) {

    const canvas =
        document.getElementById(
            "performanceChart"
        );


    if (performanceChart !== null) {

        performanceChart.destroy();

    }


    // Convert GPA to percentage
    // so all values use a 0-100 scale

    const gpaPercentage =
        previousGpa * 10;


    performanceChart =
        new Chart(
            canvas,
            {

                type: "bar",

                data: {

                    labels: [

                        "Attendance",

                        "Internal Marks",

                        "Assignment Marks",

                        "Previous GPA"

                    ],

                    datasets: [

                        {

                            label:
                                "Performance (%)",

                            data: [

                                attendance,

                                internalMarks,

                                assignmentMarks,

                                gpaPercentage

                            ],

                            borderWidth: 1

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {

                        y: {

                            beginAtZero: true,

                            max: 100,

                            title: {

                                display: true,

                                text:
                                    "Percentage"

                            }

                        }

                    },

                    plugins: {

                        legend: {

                            display: true

                        },

                        title: {

                            display: true,

                            text:
                                "Student Performance Factors"

                        }

                    }

                }

            }
        );

}
