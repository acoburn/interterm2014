#include <iostream>
#include <fstream>
#include <string>
#include <vector>

int main () {

    std::ifstream ifs;
    std::string line;
    std::vector<std::string> files;
    
    // Add file names to a std::vector
    files.push_back("data/file1.txt");
    files.push_back("data/file2.txt");
    files.push_back("data/file3.txt");
    files.push_back("data/file4.txt");
    files.push_back("data/file5.txt");

    // Iterate over filenames, open each and send content to std::cout
    for(std::vector<std::string>::iterator it = files.begin(); it != files.end(); ++it) {
        ifs.open(*it);
        while (std::getline(ifs, line)) {
            std::cout << line << '\n';
        }
        ifs.close();
    }
    
    return 0;
}
