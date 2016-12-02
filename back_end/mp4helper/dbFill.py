#!/usr/bin/env python

"""
 * @file dbFill.py
 * Used in CS498RK MP4 to populate database with randomly generated users and tasks.
 *
 * @author Aswin Sivaraman
 * @date Created: Spring 2015
 * @date Modified: Spring 2015
"""

import sys
import getopt
import httplib
import urllib
import json
from random import randint
from random import choice
from datetime import date
from time import mktime

def usage():
    print 'dbFill.py -u <baseurl> -p <port> -n <numUsers> -c <numChefs>'

def getUsers(conn):
    # Retrieve the list of users
    conn.request("GET","""/api/users?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    users = [str(d['data'][x]['_id']) for x in xrange(len(d['data']))]

    return users

def main(argv):

    # Server Base URL and port
    baseurl = "127.0.0.1"
    port = 8000

    # Number of POSTs that will be made to the server
    userCount = 100
    chefCount = 100

    try:
        opts, args = getopt.getopt(argv,"hu:p:n:c:",["url=","port=","users=","tasks="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
             usage()
             sys.exit()
        elif opt in ("-u", "--url"):
             baseurl = str(arg)
        elif opt in ("-p", "--port"):
             port = int(arg)
        elif opt in ("-n", "--users"):
             userCount = int(arg)
        elif opt in ("-c", "--chefs"):
             chefCount = int(arg)

    # Python array containing common first names and last names
    firstNames = ["james","john","robert","michael","william","david","richard","charles","joseph","thomas","christopher","daniel","paul","mark","donald","george","kenneth","steven","edward","brian","ronald","anthony","kevin","jason","matthew","gary","timothy","jose","larry","jeffrey","frank","scott","eric","stephen","andrew","raymond","gregory","joshua","jerry","dennis","walter","patrick","peter","harold","douglas","henry","carl","arthur","ryan","roger","joe","juan","jack","albert","jonathan","justin","terry","gerald","keith","samuel","willie","ralph","lawrence","nicholas","roy","benjamin","bruce","brandon","adam","harry","fred","wayne","billy","steve","louis","jeremy","aaron","randy","howard","eugene","carlos","russell","bobby","victor","martin","ernest","phillip","todd","jesse","craig","alan","shawn","clarence","sean","philip","chris","johnny","earl","jimmy","antonio","danny","bryan","tony","luis","mike","stanley","leonard","nathan","dale","manuel","rodney","curtis","norman","allen","marvin","vincent","glenn","jeffery","travis","jeff","chad","jacob","lee","melvin","alfred","kyle","francis","bradley","jesus","herbert","frederick","ray","joel","edwin","don","eddie","ricky","troy","randall","barry","alexander","bernard","mario","leroy","francisco","marcus","micheal","theodore","clifford","miguel","oscar","jay","jim","tom","calvin","alex","jon","ronnie","bill","lloyd","tommy","leon","derek","warren","darrell","jerome","floyd","leo","alvin","tim","wesley","gordon","dean","greg","jorge","dustin","pedro","derrick","dan","lewis","zachary","corey","herman","maurice","vernon","roberto","clyde","glen","hector","shane","ricardo","sam","rick","lester","brent","ramon","charlie","tyler","gilbert","gene"]
    lastNames = ["smith","johnson","williams","jones","brown","davis","miller","wilson","moore","taylor","anderson","thomas","jackson","white","harris","martin","thompson","garcia","martinez","robinson","clark","rodriguez","lewis","lee","walker","hall","allen","young","hernandez","king","wright","lopez","hill","scott","green","adams","baker","gonzalez","nelson","carter","mitchell","perez","roberts","turner","phillips","campbell","parker","evans","edwards","collins","stewart","sanchez","morris","rogers","reed","cook","morgan","bell","murphy","bailey","rivera","cooper","richardson","cox","howard","ward","torres","peterson","gray","ramirez","james","watson","brooks","kelly","sanders","price","bennett","wood","barnes","ross","henderson","coleman","jenkins","perry","powell","long","patterson","hughes","flores","washington","butler","simmons","foster","gonzales","bryant","alexander","russell","griffin","diaz","hayes"]
    zipcodes = [61815, 61816, 61820, 61821, 61822, 61824, 61825, 61826, 61840, 61843, 61845, 61847, 61849, 61851, 61852, 60949, 61853, 61859, 61862, 61863, 61864, 61866, 61871, 61872, 61873, 61874, 61875, 61877,61878, 61880, 61801, 61802, 61803]

    # Server to connect to (1: url, 2: port number)
    conn = httplib.HTTPConnection(baseurl, port)

    # HTTP Headers
    headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}

    # Array of user IDs
    userIDs = []
    userNames = []
    userEmails = []
    userLocations = []
    # Loop 'userCount' number of times
    for i in xrange(userCount):

        # Pick a random first name and last name
        x = randint(0,99)
        y = randint(0,99)
        #pick a random zipcode
        z = randint(0,32)
        params = urllib.urlencode({'name': firstNames[x] + " " + lastNames[y], 'email': firstNames[x] + "@" + lastNames[y] + ".com", 'location': zipcodes[z]})
        
        # POST the user
        conn.request("POST", "/api/users", params, headers)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)

        # Store the users id
        userIDs.append(str(d['data']['_id']))
        userNames.append(str(d['data']['name']))
        userEmails.append(str(d['data']['email']))
        userLocations.append(str(d['data']['location']))

    cuisines = ["american", "british", "caribbean", "chinese", "french", "greek", "indian", "italian", "japanese", "mediterranean", "mexican", "moroccan", "spanish", "thai", "turkish", "vietnamese"]

     # Array of user IDs
    chefIDs = []
    chefNames = []
    chefEmails = []
    chefCuisines = []
    chefProfilePics = [];
    chefDescriptions = [];
    chefLocations = []
    for i in xrange(chefCount):
        # Pick a random first name and last name
        x = randint(0,99)
        y = randint(0,99)
        #pick a random zipcode
        z = randint(0,32)
        c = randint(0,15)
        params = urllib.urlencode({'name': firstNames[x] + " " + lastNames[y], 'email': firstNames[x] + "@" + lastNames[y] + ".com", 'profile_pic' : "sample_pic", "cuisines" : cuisines[c], "description": "sample_description", 'location': zipcodes[z]})
        
        # POST the user
        conn.request("POST", "/api/chefs", params, headers)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)

        # Store the users id
        chefIDs.append(str(d['data']['_id']))
        chefNames.append(str(d['data']['name']))
        chefEmails.append(str(d['data']['email']))
        chefCuisines.append(str(d['data']['cuisines']))
        chefProfilePics.append(str(d['data']['profile_pic']))
        chefDescriptions.append(str(d['data']['description']))
        chefLocations.append(str(d['data']['location']))

    # Exit gracefully
    conn.close()
    print str(userCount)+" users and " + str(chefCount) + " chefs added at "+baseurl+":"+str(port)


if __name__ == "__main__":
     main(sys.argv[1:])