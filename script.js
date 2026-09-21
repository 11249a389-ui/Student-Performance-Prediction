let predictionChart;
let inputChart;

function predictPerformance() {

    const studentId = document.getElementById("studentId").value;
    const studentName = document.getElementById("studentName").value;

    const attendance = parseFloat(document.getElementById("attendance").value);
    const studyHours = parseFloat(document.getElementById("studyHours").value);
    const internalMarks = parseFloat(document.getElementById("internalMarks").value);
    const assignmentMarks = parseFloat(document.getElementById("assignmentMarks").value);
    const previousGpa = parseFloat(document.getElementById("previousGpa").value);

    if (
        studentId === "" ||
        studentName === "" ||
        isNaN(attendance) ||
        isNaN(studyHours) ||
        isNaN(internalMarks) ||
        isNaN(assignmentMarks) ||
        isNaN(previousGpa)
    ) {
        alert("Please enter all student details.");
        return;
    }

    let predictedCgpa =
        ((attendance / 100) * 2.0) +
        ((studyHours / 10) * 1.5) +
        ((internalMarks / 100) * 2.0) +
        ((assignmentMarks / 100) * 1.5) +
        ((previousGpa / 10) * 2.5);

    predictedCgpa = Math.max(0, Math.min(10, predictedCgpa));

    const predictedPercentage = predictedCgpa * 10;

    let performance;

    if (predictedCgpa >= 9) {
        performance = "Excellent";
    } else if (predictedCgpa >= 8) {
        performance = "Very Good";
    } else if (predictedCgpa >= 7) {
        performance = "Good";
    } else if (predictedCgpa >= 6) {
        performance = "Average";
    } else {
        performance = "Needs Improvement";
    }

    document.getElementById("predictedCgpa").innerText =
        predictedCgpa.toFixed(2);

    document.getElementById("predictedPercentage").innerText =
        predictedPercentage.toFixed(2) + "%";

    document.getElementById("performance").innerText =
        performance;

    createPredictionChart(
        predictedCgpa,
        predictedPercentage
    );

    createInputChart(
        attendance,
        studyHours,
        internalMarks,
        assignmentMarks,
        previousGpa
    );
}


function createPredictionChart(cgpa, percentage) {

    const ctx = document
        .getElementById("predictionChart")
        .getContext("2d");

    if (predictionChart) {
        predictionChart.destroy();
    }

    predictionChart = new Chart(ctx, {

        type: "bar",

        data: {
            labels: [
                "Predicted CGPA",
                "Predicted Percentage"
            ],

            datasets: [{
                label: "Prediction",
                data: [
                    cgpa,
                    percentage
                ]
            }]
        },

        options: {
            responsive: true,

            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }

    });
}


function createInputChart(
    attendance,
    studyHours,
    internalMarks,
    assignmentMarks,
    previousGpa
) {

    const ctx = document
        .getElementById("inputChart")
        .getContext("2d");

    if (inputChart) {
        inputChart.destroy();
    }

    inputChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Attendance",
                "Study Hours",
                "Internal Marks",
                "Assignment Marks",
                "Previous GPA"
            ],

            datasets: [{

                label: "Student Performance Data",

                data: [
                    attendance,
                    studyHours * 10,
                    internalMarks,
                    assignmentMarks,
                    previousGpa * 10
                ]

            }]
        },

        options: {

            responsive: true,

            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }

        }

    });
}
