import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
data = pd.read_csv("students_100.csv")

print("\n======================================")
print(" STUDENT PERFORMANCE PREDICTION")
print("======================================")

print("\nTotal students:", len(data))

X = data[
    [
        "attendance",
        "study_hours",
        "internal_marks",
        "assignment_marks",
        "previous_gpa"
    ]
]

# Target
y = data["final_gpa"]


X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

print("Training students:", len(X_train))
print("Testing students:", len(X_test))



model = LinearRegression()
model.fit(X_train, y_train)

print("\nModel trained successfully!")


y_pred = model.predict(X_test)

mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("\n======================================")
print(" MODEL EVALUATION")
print("======================================")

print("Mean Absolute Error:", round(mae, 3))
print("R2 Score:", round(r2, 3))



all_predictions = model.predict(X)

data["predicted_cgpa"] = all_predictions.round(2)

data["predicted_percentage"] = (
    data["predicted_cgpa"] * 10
).round(2)
def performance_category(cgpa):
    if cgpa >= 9:
        return "Excellent"
    elif cgpa >= 8:
        return "Very Good"
    elif cgpa >= 7:
        return "Good"
    elif cgpa >= 6:
        return "Average"
    else:
        return "Needs Improvement"

data["performance"] = data["predicted_cgpa"].apply(
    performance_category
)



data.to_csv(
    "student_cgpa_predictions.csv",
    index=False
)

print("\nPrediction file created:")
print("student_cgpa_predictions.csv")

print("\n======================================")
print(" GRAPHICAL REPRESENTATION")
print("======================================")

# Graph 1: Actual vs Predicted GPA
plt.figure(figsize=(8, 5))
plt.scatter(y_test, y_pred)
plt.plot(
    [y_test.min(), y_test.max()],
    [y_test.min(), y_test.max()],
    linestyle="--"
)
plt.xlabel("Actual Final GPA")
plt.ylabel("Predicted Final GPA")
plt.title("Actual vs Predicted GPA")
plt.grid(True)
plt.tight_layout()
plt.show()

plt.figure(figsize=(8, 5))
plt.scatter(data["attendance"], data["predicted_cgpa"])
plt.xlabel("Attendance (%)")
plt.ylabel("Predicted CGPA")
plt.title("Attendance vs Predicted CGPA")
plt.grid(True)
plt.tight_layout()
plt.show()
plt.figure(figsize=(8, 5))
plt.scatter(data["study_hours"], data["predicted_cgpa"])
plt.xlabel("Study Hours")
plt.ylabel("Predicted CGPA")
plt.title("Study Hours vs Predicted CGPA")
plt.grid(True)
plt.tight_layout()
plt.show()
performance_counts = data["performance"].value_counts()

plt.figure(figsize=(8, 5))
plt.bar(
    performance_counts.index,
    performance_counts.values
)
plt.xlabel("Performance Category")
plt.ylabel("Number of Students")
plt.title("Student Performance Distribution")
plt.xticks(rotation=20)
plt.grid(axis="y")
plt.tight_layout()
plt.show()

print("\n======================================")
print(" SELECT STUDENT RANGE")
print("======================================")

start_id = int(
    input("Enter beginning Student ID (1-100): ")
)

end_id = int(
    input("Enter ending Student ID (1-100): ")
)

if start_id < 1 or end_id > 100:

    print("\nInvalid Student ID.")
    print("Please enter IDs between 1 and 100.")

elif start_id > end_id:

    print("\nInvalid range.")
    print("Beginning ID must be smaller than ending ID.")

else:

    selected_students = data[
        (data["student_id"] >= start_id)
        &
        (data["student_id"] <= end_id)
    ]

    print("\n======================================")
    print(" SELECTED STUDENTS")
    print("======================================")

    print(
        selected_students[
            [
                "student_id",
                "name",
                "attendance",
                "study_hours",
                "internal_marks",
                "assignment_marks",
                "previous_gpa",
                "predicted_cgpa",
                "predicted_percentage",
                "performance"
            ]
        ].to_string(index=False)
    )

    print("\n======================================")
    print(" SUMMARY")
    print("======================================")

    print(
        "Number of students:",
        len(selected_students)
    )

    print(
        "Average predicted CGPA:",
        round(
            selected_students["predicted_cgpa"].mean(),
            2
        )
    )

    print(
        "Average predicted percentage:",
        round(
            selected_students["predicted_percentage"].mean(),
            2
        ),
        "%"
    )
    plt.figure(figsize=(10, 5))
    plt.bar(
        selected_students["student_id"].astype(str),
        selected_students["predicted_cgpa"]
    )
    plt.xlabel("Student ID")
    plt.ylabel("Predicted CGPA")
    plt.title("Predicted CGPA of Selected Students")
    plt.xticks(rotation=45)
    plt.grid(axis="y")
    plt.tight_layout()
    plt.show()

print("\n======================================")
print(" PROJECT COMPLETED SUCCESSFULLY")
print("======================================")
