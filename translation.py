import sys
from googletrans import Translator

def process_data(input_text):
  translator = Translator()
  translated_text = translator.translate(input_text, src="en", dest="fr").text
  return translated_text

if __name__ == "__main__":
  input_text = sys.argv[1] if len(sys.argv) > 1 else "No input"
  response = process_data(input_text)
  print(response)