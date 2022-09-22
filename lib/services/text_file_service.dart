import 'dart:io';

import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:intl/intl.dart';
import 'package:path_provider/path_provider.dart';

import '../config/config.dart';
import '../models/user_model.dart';
import '../upload/qr_screen.dart';
import '../widgets/boxes.dart';
import '../widgets/progress_dialog.dart';
import 'ipfs/ipfs_service.dart';

class TextFileService {
  @protected
  @mustCallSuper
  void dispose() {
    Hive.close();
  }

//PICKER
  static Future<void> uploadTextFile(BuildContext context, String text) async {
    final List<UserModel> transactions = [];

    try {
      //Nothing picked
      if (text.isEmpty) {
        Fluttertoast.showToast(
          msg: 'Please enter text',
        );
        return;
      } else {
        showDialog(
          barrierDismissible: false,
          context: context,
          builder: (BuildContext context) => const ProgressDialog(
            status: 'Uploading to IPFS',
          ),
        );

        final String? dir = Platform.isIOS
            ? (await getApplicationDocumentsDirectory()).path
            : (await getExternalStorageDirectory())?.path;
        final String path = '$dir/${DateTime.now()}myText.txt';
        final File file = File.fromUri(Uri.parse(path));
        await file.writeAsString(text);
        // upload images to ipfs
        final cid = await IpfsService().uploadToIpfs(file.path);
        // debugPrint(cid);

        // Saving the transaction to database
        // DatabaseReference transaction =
        //     FirebaseDatabase.instance.ref().child('transactions');

        // String uploadID = transaction.push().key!;

        // Map transactionMap = {
        //   'url': ipfsURL + cid,
        //   'date': DateFormat.yMMMd().format(DateTime.now()),
        //   'received': false,
        // };

        // transaction.child(uploadID).set(transactionMap);

        // Saving the transaction to database
        final transactionMap = UserModel()
          ..url = ipfsURL + cid
          ..date = DateFormat.yMMMd().format(DateTime.now())
          ..received = false;

        final box = Boxes.getTransactions();
        box.add(transactionMap);

        // Popping out the dialog box
        Navigator.pop(context);

        // Take to QrScreen
        await Get.to(() => QrScreen(cid: cid));
      }
    } catch (e) {
      debugPrint('Error at images picker: $e');
      SnackBar(
        content: Text(
          'Error at images picker: $e',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 15),
        ),
      );
      return null;
    }
  }
}
