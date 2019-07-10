import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'dart:convert' as convert;
import 'package:http/http.dart' as http;

void main() async {
  print(min(12, 13));
  print(max(10, 100));

  var result = await getDataFromZhihuApi();
  print(result);

  var res = await getGoogleApi();
  print(res);
}

getDataFromZhihuApi() async {
  var httpClient = new HttpClient();
  var uri = new Uri.http('news-at.zhihu.com', '/api/3/stories/latest');
  var request = await httpClient.getUrl(uri);
  var response = await request.close();
  return await response.transform(utf8.decoder).join();
}

getGoogleApi() async {
  var url = "https://news-at.zhihu.com/api/3/stories/latest";
  print('=============');
  var response = await http.get(url);
  if (response.statusCode == 200) {
    var jsonResponse = convert.jsonDecode(response.body);
    var itemCount = jsonResponse['stories'];
    print("Number of books about http: $itemCount.");
    return itemCount;
  } else {
    print("Request failed with status: ${response.statusCode}.");
  }
}
