import re

with open("index.html", "r") as f:
    text = f.read()

# The blocks
career_match = re.search(r'            <!-- ============ CAREER ============ -->\n.*?            </section>\n', text, re.DOTALL)
edu_match = re.search(r'            <!-- ============ EDUCATION ============ -->\n.*?            </section>\n', text, re.DOTALL)
prod_match = re.search(r'            <!-- ============ PRODUCTS ============ -->\n.*?            </section>\n', text, re.DOTALL)
exp_match = re.search(r'            <!-- ============ EXPERIMENTAL PROJECTS ============ -->\n.*?            </section>\n', text, re.DOTALL)

career_text = career_match.group(0)
edu_text = edu_match.group(0)
prod_text = prod_match.group(0)
exp_text = exp_match.group(0)

# Replace the whole <div class="sections-grid"> ... </div>
grid_match = re.search(r'        <div class="sections-grid">\n.*?\n        </div>', text, re.DOTALL)

new_grid = f'''        <div class="sections-grid">

            <div class="sections-col sections-col--left">
{edu_text}
{career_text}            </div>

            <div class="sections-col sections-col--right">
{prod_text}
{exp_text}            </div>

        </div>'''

text = text.replace(grid_match.group(0), new_grid)

with open("index.html", "w") as f:
    f.write(text)
print("Done")
