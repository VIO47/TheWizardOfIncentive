import pandas as pd
import matplotlib.pyplot as plt

# -----------------------
# Load Excel File
# -----------------------
file_path = "experiments.xlsx"  # change if needed
df = pd.read_excel(file_path)

# -----------------------
# Convert time columns to datetime
# -----------------------
df["startTime"] = pd.to_datetime(df["startTime"])
df["endTime"] = pd.to_datetime(df["endTime"])

# Compute duration in minutes
df["duration_minutes"] = (df["endTime"] - df["startTime"]).dt.total_seconds() / 60

# -----------------------
# Plot Average Time per Condition (3 separate bar charts)
# -----------------------
conditions = ["no-tool", "descriptive", "prescriptive"]

for condition in conditions:
    subset = df[df["experimentType"] == condition]
    avg_time = subset["duration_minutes"].mean()

    plt.figure()
    plt.bar(["Average Time"], [avg_time])
    plt.title(f"Average Completion Time - {condition}")
    plt.ylabel("Minutes")
    plt.xlabel(condition)
    plt.show()

# -----------------------
# Count Yes / No in Columns "Add bonuses"
# -----------------------
if "Q 16" in df.columns:
    yes_count = (df["Q 16"] == "Yes").sum()
    no_count = (df["Q 16"] == "No").sum()

    print(f"\nColumn Q 16:")
    print(f"Yes count: {yes_count}")
    print(f"No count: {no_count}")

    # Optional: Plot counts
    plt.figure()
    plt.bar(["Yes", "No"], [yes_count, no_count])
    plt.title(f"Distribution of usage of bonuses")
    plt.show()
else:
    print(f"\nColumn Q 16 not found in dataset.")

# -----------------------
# Count Yes / No in Columns "Add penalties"
# -----------------------
if "Q 22" in df.columns:
    yes_count = (df["Q 22"] == "Yes").sum()
    no_count = (df["Q 22"] == "No").sum()

    print(f"\nColumn Q 22:")
    print(f"Yes count: {yes_count}")
    print(f"No count: {no_count}")

    # Optional: Plot counts
    plt.figure()
    plt.bar(["Yes", "No"], [yes_count, no_count])
    plt.title(f"Distribution of usage of penalties")
    plt.show()
else:
    print(f"\nColumn Q 22 not found in dataset.")

# -----------------------
# Count how many people just go for a flat amount
# -----------------------
if "Q 6" in df.columns:
    flat_count = (df["Q 6"] == "Just use a flat amount of money").sum()
    print(f"\nColumn Q 6:")
    print(f"Count of 'Just use a flat amount of money': {flat_count}")


# -----------------------
# Count average length of open ended answers
# -----------------------

# HEURISTICS
eligible = df["Q 11"].notna()
responded = df["Q 11"].astype(str).str.strip() != ""

eligible_df = df[eligible]
responded_df = eligible_df[eligible_df["Q 11"].astype(str).str.strip() != ""]

# Word count
responded_df["heuristics_word_count"] = responded_df["Q 11"].apply(lambda x: len(str(x).split()))

print("Eligible:", len(eligible_df))
print("Responded:", len(responded_df))
print("Mean words:", responded_df["heuristics_word_count"].mean())
print("Median words:", responded_df["heuristics_word_count"].median())

# PENALTIES USAGE
eligible = df["Q 23"].notna()
responded = df["Q 23"].astype(str).str.strip() != ""

eligible_df = df[eligible]
responded_df = eligible_df[eligible_df["Q 23"].astype(str).str.strip() != ""]

# Word count
responded_df["penalties_word_count"] = responded_df["Q 23"].apply(lambda x: len(str(x).split()))

print("Eligible:", len(eligible_df))
print("Responded:", len(responded_df))
print("Mean words:", responded_df["penalties_word_count"].mean())
print("Median words:", responded_df["penalties_word_count"].median())

# LUCK IMPLEMENTATION
eligible = df["Q 19"].notna()
responded = df["Q 19"].astype(str).str.strip() != ""

eligible_df = df[eligible]
responded_df = eligible_df[eligible_df["Q 19"].astype(str).str.strip() != ""]

# Word count
responded_df["luck_word_count"] = responded_df["Q 19"].apply(lambda x: len(str(x).split()))

print("Eligible:", len(eligible_df))
print("Responded:", len(responded_df))
print("Mean words:", responded_df["luck_word_count"].mean())
print("Median words:", responded_df["luck_word_count"].median())



