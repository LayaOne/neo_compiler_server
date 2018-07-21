
neo_workspace_path="/home/ubuntu/neo_workspace"
cd $neo_workspace_path
echo "Start create NEO Contract Project $1"
temp_project_folder="neo_temp_project_$1"
final_folder_path=${neo_workspace_path}"/"${temp_project_folder}
echo $final_folder_path
mkdir -p $final_folder_path
cd $final_folder_path
dotnet new classlib
rm ./Class1.cs
dotnet add package Neo.SmartContract.Framework --version 2.5.4
echo $final_folder_path" Project created"

# 将文件写入拷贝到项目文件夹
cp $2 $final_folder_path"/"
# 编译
dotnet publish -o ../testlib
echo "public "${temp_project_folder}".dll"

