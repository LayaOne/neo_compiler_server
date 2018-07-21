
neo_workspace_path="/Users/Xhacker/Documents/DemoProjects"
cd $neo_workspace_path
echo "Start create NEO Contract Project $1"
temp_project_folder="neo_temp_project_$1"
final_folder_path=${neo_workspace_path}${temp_project_folder}
echo $final_folder_path
mkdir -p $final_folder_path
cd $final_folder_path
dotnet new classlib
rm ./Class1.cs

