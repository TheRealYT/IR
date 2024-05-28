import os

# Specify the directory path
directory = 'C:\\Users\\hp\\Documents\\IR\\Documents'

# Initialize total word count
total_word_count = 0

# Loop over each file in the directory
for filename in os.listdir(directory):
    # Construct the full path to the file
    filepath = os.path.join(directory, filename)
    
    # Check if the path is a file
    if os.path.isfile(filepath):
        # Open the file for reading
        with open(filepath, 'r', encoding='utf-8') as file:
            # Read the contents of the file
            content = file.read()
            
            # Split the content into words (assuming words are separated by whitespace)
            words = content.split()
            
            # Count the number of words in the file
            word_count = len(words)
            
            # Accumulate the word count to the total count
            total_word_count += word_count
            
            # Print the word count for the current file
            print(f"Number of words in {filename}: {word_count}")

# Print the total word count for all documents
print(f"Total number of words in all documents: {total_word_count}")
