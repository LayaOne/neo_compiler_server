
neo_workspace_path = "/home/ubuntu/neo_workspace";
echo "Start create NEO Contract Project $1"
cd ${neo_workspace_path}
temp_project_folder = "neo_temp_project_$1"
mkdir ${temp_project_folder}
cd ${temp_project_folder}
dotnet new classlib
rm ./Class1.cs

