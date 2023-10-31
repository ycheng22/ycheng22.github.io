# Learn Shell (Bash)

- Blog: [Bash Scripting Tutorial – Linux Shell Script and Command Line for Beginners](https://www.freecodecamp.org/news/bash-scripting-tutorial-linux-shell-script-and-command-line-for-beginners/)
- How to run: wsl or ubuntu
- Checking your shell type: `ps`

## Basic cmds:
- `date`
- `pwd`
- `ls`
- `cd`
- `mkdir`
- `touch`: Create a new file.
- `rm`
- `cp`: Copy a file or directory.
- `mv`
- `echo`: Print text to the terminal.
- `cat`: Concatenate and print the contents of a file.
- `grep`: Search for a pattern in a file.
- `chmod`: Change the permissions of a file or directory.
- `sudo`: Run a command with administrative privileges.
- `df`: Display the amount of disk space available.
- `history`: Show a list of previously executed commands.
- `ps`: Display information about running processes.
- `man + cmd` name: check cmd manual 
- Bash scripts start with a shebang. Shebang is a combination of bash # and bang ! followed by the bash shell path. `which bash`, example: `#!/bin/bash`.
- Comment start with `#`
  

## Create a bash script
Create a file named run_all.sh using the vi command. You can use any editor of your choice.

```bash
vi run_all.sh
```
Save and exit vim: `:wq`.

Add the following commands in your file and save it:

```bash
#!/bin/bash
echo "Today is " `date`

echo -e "\nenter the path to directory"
read the_path

echo -e "\n you path has the following files and folders: "
ls $the_path
```
Change ownership:
```chmod u+x run_all.sh```

You can run the script using any of the mentioned methods: 
- `sh run_all.sh`
- `bash run_all.sh`
- `./run_all.sh`

## Variables
There are no data types in Bash. In Bash, a variable is capable of storing numeric values, individual characters, or strings of characters.
- Assign directly: `country=US`
- Assign the value based on the output obtained from a program or command: `same_country=$country`
- To access the variable value, append `$` to the variable name.
- Variable names are case-sensitive.
- Avoid using reserved keywords, such as if, then, else, fi, and so on as variable names.
 
 ## Input and output in Bash scripts
 ### Gathering input
 - Reading the user input and storing it in a variable
    ```bash
    echo -e "\nenter the path to directory"
    read the_path

    echo -e "\nyour path has the following files and folders: "
    ls $the_path
    ```
- Reading from a file. 
  
  This code reads each line from a file named input.txt and prints it to the terminal. We'll study while loops later in this article.
  ```bash
  while read line
  do
    echo $line
  done < input.txt
  ```
- Command line arguments
  
  In a bash script or function, $1 denotes the initial argument passed, $2 denotes the second argument passed, and so forth.

  There is a file `greeting.sh`:
  ```bash
  #!/bin/bash
  echo "Hello, $1!"
  ```
  Run this script with one argument: `./greeting.sh there`
### Displaying output
- Printing to the terminal:
  ```bash
  echo "Hello, World!"
  ```
- Writing to a file:
  ```bash
  echo "This is some text." > output.txt
  ```
  The >operator **overwrites** a file if it already has some content.
- Appending to a file
  ```bash
  echo "More text." >> output.txt
  ```
- Redirecting output:
  ```bash
  ls > files.txt
  ```
  This lists the files in the current directory and writes the output to a file named files.txt. 

## Conditional statements (if/else)
Syntax:
```bash
if [[ condition ]];
then
	statement
elif [[ condition ]]; then
	statement 
else
	do this by default
fi
```
Logical operators such as AND `-a` and OR `-o`.
```bash
if [ $a -gt 60 -a $b -lt 100 ]
```
*This statement checks if both conditions are true: a is greater than 60 AND b is less than 100.*

An example to determine if a user-inputted number is positive, negative, or zero:
```bash
#!/bin/bash

echo "Please enter a number: "
read num

if [ $num -gt 0 ]; then
  echo "$num is positive"
elif [ $num -lt 0 ]; then
  echo "$num is negative"
else
  echo "$num is zero"
fi
```
## Looping and Branching in Bash
### While loop
```bash
#!/bin/bash
i=1
while [[ $i -le 10 ]] ; do
   echo "$i"
  (( i += 1 ))
done
```
### For loop
```bash
#!/bin/bash

for i in {1..5}
do
    echo $i
done
```
### Case statements
```bash
case expression in
    pattern1)
        # code to execute if expression matches pattern1
        ;;
    pattern2)
        # code to execute if expression matches pattern2
        ;;
    pattern3)
        # code to execute if expression matches pattern3
        ;;
    *)
        # code to execute if none of the above patterns match expression
        ;;
esac
```
Example:
```bash
#!/bin/bash
fruit="apple"

case $fruit in
    "apple")
        echo "This is a red fruit."
        ;;
    "banana")
        echo "This is a yellow fruit."
        ;;
    "orange")
        echo "This is an orange fruit."
        ;;
    *)
        echo "Unknown fruit."
        ;;
esac
```
## Schedule Scripts using cron
Below is the syntax to schedule crons:
```bash
# Cron job example
* * * * * sh /path/to/script.sh
```
Below are some examples of scheduling cron jobs.
![](./cron.PNG)

### Using crontab
The `crontab` utility is used to add and edit the cron jobs.

`crontab -l` lists the already scheduled scripts for a particular user.

You can add and edit the cron through `crontab -e`.

You can read more about corn jobs in other article [How to Automate Tasks with cron Jobs in Linux](https://www.freecodecamp.org/news/cron-jobs-in-linux/).

## How to Debug and Troubleshoot Bash Scripts
### Set the `set -x` option
This option enables debugging mode, which causes Bash to print each command that it executes to the terminal, preceded by a + sign. This can be incredibly helpful in identifying where errors are occurring in your script.
```bash
#!/bin/bash

set -x

# Your script goes here
```
### Check the exit code
When Bash encounters an error, it sets an exit code that indicates the nature of the error. You can check the exit code of the most recent command using the `$?` variable. A value of 0 indicates success, while any other value indicates an error.
```bash
#!/bin/bash

# Your script goes here

if [ $? -ne 0 ]; then
    echo "Error occurred."
fi
```
### Use `echo` statements
```bash
#!/bin/bash

# Your script goes here

echo "Value of variable x is: $x"

# More code goes here
```
### Use the `set -e` option
If you want your script to exit immediately when any command in the script fails, you can use the set -e option. This option will cause Bash to exit with an error if any command in the script fails.
```bash
#!/bin/bash

set -e

# Your script goes here
```

### Troubleshooting crons by verifying logs
For Ubuntu/Debian, you can find cronlogs at:
`/var/log/syslog`.
