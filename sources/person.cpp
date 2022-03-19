#include <string>
#include <map>

using namespace std;

struct Person
{
  string name = "Ethan Lerner";
  string aliases[1] = {"miapolis"};
  map<string, string> socials = {
      {"Email", "ethan@lerners.io"},
      {"GitHub", "https://github.com/miapolis"},
      {"Discord", "miapolis#????"},
      {"Spotify", "https://lerners.io/spotify"},
      {"Steam", "https://lerners.io/steam"}};
};

int main()
{
  struct Person ethan;
  return 0;
}
