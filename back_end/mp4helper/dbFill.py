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
import random
from random import randint
from random import choice
from datetime import date
from time import mktime

def usage():
    print 'dbFill.py -u <baseurl> -p <port> -n <numUsers> -c <numChefs> -r <numRequests>'

def getUsers(conn):
    # Retrieve the list of users
    conn.request("GET","""/api/users?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)

    # Array of user IDs
    users = [str(d['data'][x]['_id']) for x in xrange(len(d['data']))]

    return users

def getChefs(conn):
    conn.request("GET","""/api/chefs?filter={"_id":1}""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data);
    
    chefs = [str(d['data'][x]['_id']) for x in xrange(len(d['data']))]

    return chefs

def main(argv):

    # Server Base URL and port
    baseurl = "127.0.0.1"
    port = 8000

    # Number of POSTs that will be made to the server
    userCount = 100
    chefCount = 100
    requestCount = 30
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
        elif opt in ("-r", "--requests"):
             requestCount = int(art)

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
    # Loop 'userCount' number of times
    for i in xrange(userCount):

        # Pick a random first name and last name
        x = randint(0,99)
        y = randint(0,99)
        #pick a random zipcode
        z = randint(0,32)
        params = urllib.urlencode({'name': firstNames[x] + " " + lastNames[y], 'email': firstNames[x] + "@" + lastNames[y] + ".com", 'location': zipcodes[z], 'hashed_password': "sample_password"})
        
        # POST the user
        conn.request("POST", "/api/users", params, headers)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)

        # Store the users id

    cuisines = ["american", "british", "caribbean", "chinese", "french", "greek", "indian", "italian", "japanese", "mediterranean", "mexican", "moroccan", "spanish", "thai", "turkish", "vietnamese"]

     # Array of user IDs
    chefIDs = []
    for i in xrange(chefCount):
        # Pick a random first name and last name
        x = randint(0,99)
        y = randint(0,99)
        #pick a random zipcode
        z = randint(0,32)
        c = randint(0,15)
        params = urllib.urlencode({'name': firstNames[x] + " " + lastNames[y], 'email': firstNames[x] + "@" + lastNames[y] + ".com", 'profile_pic' : "sample_pic", "cuisines" : cuisines[c], "description": "sample_description", 'location': zipcodes[z], 'hashed_password': "sample_password"})
        
        # POST the user
        conn.request("POST", "/api/chefs", params, headers)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)

        # Store the users id

    budget = [20, 30, 40, 50, 60, 70, 80, 90]
    payment = [20, 30, 40, 50, 60, 70, 80, 90]
    status = ["accepted", "rejected", "completed", "pending"]
    users = getUsers(conn);
    chefs = getChefs(conn);
    for i in xrange(requestCount):

        # Randomly generate task parameters
        assignedUser = random.choice(users)
        assignedChef = random.choice(chefs)
        d = (mktime(date.today().timetuple()) + randint(86400,864000)) * 1000
        description = "sample_description"
        b = randint(0,7)
        p = randint(0,7)
        c = randint(0,15)
        s = randint(0,3)
        params = urllib.urlencode({'assignedUser': assignedUser, 'assignedChef': assignedChef, 'budget': budget[b], 'payment': payment[p], 'cuisine': cuisines[c], 'date': d, 'status': status[s], 'description': description})

        # POST the task
        conn.request("POST", "/api/requests", params, headers)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)
    # Exit gracefully
    conn.close()
    print str(userCount)+" users and " + str(chefCount) + " chefs and " + str(requestCount) + " requests added at "+baseurl+":" +str(port)


if __name__ == "__main__":
     main(sys.argv[1:])